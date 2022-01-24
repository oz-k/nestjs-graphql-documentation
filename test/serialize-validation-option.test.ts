import { serializeValidationOption } from "src";

describe('serializeDescriptionOption', () => {
    it('직렬화된 문자열 반환', () => {
        const serializedValidationOption = serializeValidationOption({
            name: '이름',
            required: true,
            enum: ['a', 'b']
        });

        expect(serializedValidationOption).toBe('name: 이름\nrequired: true\nenum: ["a","b"]\n');
    });
});