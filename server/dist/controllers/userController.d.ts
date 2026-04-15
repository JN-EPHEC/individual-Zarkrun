import type { Request, Response, NextFunction } from "express";
export declare const getAllUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const postNewUsers: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const deleteUsers: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=userController.d.ts.map