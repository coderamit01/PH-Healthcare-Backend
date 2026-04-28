import { Request, Response } from "express";
import { sendResponse } from "../../shared/sendResponse";
import { RAGService } from "./rag.service";
import { catchAsync } from "../../shared/catchAsync";

const regService = new RAGService();

const getStats = async (req: Request, res: Response) => {
  const result = await regService.getStats();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "RAG stats retrieved successfully",
    data: result,
  });
}

const ingestDoctor = async (req: Request, res: Response) => {

  const result = await regService.ingestDoctorsData();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Doctors data ingestion complete',
      data: result,
    });
}

const queryRag = catchAsync(async (req: Request, res: Response) => {
  const { query, limit, sourceType } = req.body;

  if (!query) {
    return sendResponse(res, {
      success: false,
      statusCode: 403,
      message: "Query is required",
    });
  }

  const result = await regService.generateAnswer(
    query,
    limit ?? 5,
    sourceType,
    true,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Answer generated successfully",
    data: result,
  });
});

export const RagController = {
  getStats, ingestDoctor, queryRag
}
