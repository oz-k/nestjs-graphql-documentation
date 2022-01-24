import { isNotEmpty, isString } from "class-validator";
import { IValidationOptions } from "./types";

/**
 * 유효성검사 옵션을 graphql의 주석으로 사용가능하게 직렬화하는 함수
 * @param option 스웨거를 기반으로 둔 유효성검사 명세 옵션
 * @returns 직렬화된 description
 * @author oz-k
*/
export function serializeValidationOption(option: IValidationOptions) {
    let description = '';

    Object.keys(option).forEach(key => {
        //값이 존재할때
        if(isNotEmpty(option[key])) {
            //문자열이 아닐 때
            if(!isString(option[key])) {
                //문자열로 변경
                option[key] = JSON.stringify(option[key]);
            }
            description += `${key}: ${option[key]}\n`;
        }
    });

    return description;
}