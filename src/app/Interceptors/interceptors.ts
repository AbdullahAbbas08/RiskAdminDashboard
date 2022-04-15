import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHadleingInterceptor } from "./error-hadleing.interceptor";

export const InterceptorsProvider = [
    // {provide:HTTP_INTERCEPTORS,useClass:ErrorHandleingInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorHadleingInterceptor,multi:true}
]; 