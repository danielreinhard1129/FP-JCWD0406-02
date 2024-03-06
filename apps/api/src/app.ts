import cors from 'cors';
import express, {
  Express,
  NextFunction,
  Request,
  Response,
  json,
  urlencoded,
  static as static_,
} from 'express';
import { PORT } from './config';
import { SampleRouter } from './routers/sample.router';
import { UserRouter } from './routers/user.router';
import { WarehouseRouter } from './routers/warehouse.router';
import { join } from 'path';
import { TransactionRouter } from './routers/transaction.router';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use('/', static_(join(__dirname, '../public')));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send(err.message);
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const sampleRouter = new SampleRouter();
    const userRouter = new UserRouter();
    const warehouseRouter = new WarehouseRouter();
    const transactionRouter = new TransactionRouter();

    this.app.use('/api/users', userRouter.getRouter());
    this.app.use('/api/samples', sampleRouter.getRouter());
    this.app.use('/api/warehouses', warehouseRouter.getRouter());
    this.app.use('/api/transactions', transactionRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
