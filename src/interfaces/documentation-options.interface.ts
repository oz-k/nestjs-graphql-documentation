import { Type } from '@nestjs/common';
import { ApolloError } from 'apollo-server-core';

export interface ResolverDocumentationOptions {
  /** resolver 기능 */
  name: string;
  /** 추가 설명 */
  description?: string;
}

export interface FieldDocumentationOptions {
    /** 필드명 */
    name: string;
    /** 데이터 예시 */
    example?: any;
    /** 필수 여부 */
    required: boolean;
    /** 추가 설명 */
    description?: string;
    /** 기본값 */
    default?: any;
    /** 열거형 제약조건 */
    enum?: any[];
    /** 정규식 제약조건 */
    regex?: string;
    /** 데이터 최소값 */
    minimum?: number;
    /** 데이터 최대값 */
    maximum?: number;
    /** 데이터 최소길이 */
    minLength?: number;
    /** 데이터 최대길이 */
    maxLength?: number;
    /** 배열여부 */
    isArray?: boolean;
    /** 배열의 최소길이 */
    minItems?: number;
    /** 배열의 최대길이 */
    maxItems?: number;
    /** 배열 고유여부 */
    uniqueItems?: boolean;
    
}

export interface ErrorDocumentationOptions {
    /** 에러 타입 */
    error: Type<ApolloError>;
    /** 에러 설명 */
    description: string;
};