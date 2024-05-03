import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const CORS: CorsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  exposedHeaders: 'Content-Type, Access-Control-Allow-Headers, Access-Control-Expose-Headers, Content-Disposition, Authorization, X-Requested-With'
    
};
