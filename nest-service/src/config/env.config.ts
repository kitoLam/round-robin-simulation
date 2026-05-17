// () wrap cái ({}) để js hiểu ta muốn trả về 1 obj chứ đây không phải là 1 biểu thức cả đống code bên dưới
export interface  EnvConfig {
  readonly port: number
}
export const envConfig = () : EnvConfig => ({
  port: process.env.PORT ? Number(process.env.PORT) : 3000
})