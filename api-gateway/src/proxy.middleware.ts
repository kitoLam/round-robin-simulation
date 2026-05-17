import { Injectable, NestMiddleware } from "@nestjs/common";
import { createProxyMiddleware } from "http-proxy-middleware";

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  constructor() {}
  private readonly availableServers = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
  ];
  private currentProxyIndex = 0;
  /**
   * a little bit about changeOrigin
   * GET /users HTTP/1.1
   * Host: internal-service:3000      <-- Sửa nhờ changeOrigin (Microservice vui vẻ nhận)
   * X-Forwarded-For: 1.2.3.4         <-- Giữ lại nhờ xfwd (Biết IP thật của User)
   * X-Forwarded-Host: api.company.com <-- Giữ lại nhờ xfwd (Biết Domain gốc User gọi)
   */
  private proxy = createProxyMiddleware({
    router: () => {
      const calledServer = this.availableServers[this.currentProxyIndex];
      this.currentProxyIndex++;
      this.currentProxyIndex %= this.availableServers.length;
      return calledServer;
    },
    changeOrigin: true,
    xfwd: true, // to remain the client IP, info instead of this api-gateway
  })
  use(req: any, res: any, next: (error?: any) => void) {
    this.proxy(req, res, next);
  }

}