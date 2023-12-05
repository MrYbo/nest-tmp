import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseStruct } from '../../interface/response.struct';

export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map(
        (data): ResponseStruct => ({
          success: true,
          statusCode: response.statusCode,
          timestamp: new Date().toISOString(),
          data,
        }),
      ),
    );
  }
}
