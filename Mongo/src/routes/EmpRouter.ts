import express from "express";
import { Request, Response } from "express";
import { EmpController } from "../controller/EmpController";
import { Jwt } from "../config/JwtConfig";
import { logger } from "../config/LoggerConfig";
import { MESSAGE } from "../config/Constants";
export class EmpRoute {
  constructor(private empController: EmpController, private jwt: Jwt) {}

  empRoutes(app: express.Application) {
    app.post("/emp", (req: Request, res: Response) => {
      logger.info(MESSAGE.ROUTER_POST_INFO);
      this.empController.empCreate(req, res);
    });

    app.get("/emp", this.jwt.verifyToken, (req: Request, res: Response) => {
      logger.info(MESSAGE.ROUTER_GETALL_INFO);
      this.empController.empGet(req, res);
    });

    // app.get('/health', (req: Request, res: Response) => {
    //     res.send('I am health')
    // });

    app.get("/emp/:id", this.jwt.verifyToken, (req: Request, res: Response) => {
      logger.info(MESSAGE.ROUTER_GET_INFO);
      this.empController.empRead(req, res);
    });

    app.put("/emp/:id", this.jwt.verifyToken, (req: Request, res: Response) => {
      logger.info(MESSAGE.ROUTER_UPDATE_INFO);
      this.empController.empUpdate(req, res);
    });

    app.delete("/emp/:id", this.jwt.verifyToken, (req: Request, res: Response) => {
        logger.info(MESSAGE.ROUTER_DELETE_INFO);
        this.empController.empDelete(req, res);
      }
    );
  }
}
