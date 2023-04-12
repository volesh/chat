import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class IsUuidValidPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (
      metadata.type === 'param' &&
      metadata.data === 'id' &&
      !this.isValidId(value)
    ) {
      throw new BadRequestException('Uuid not valid');
    }
    return value;
  }
  private isValidId(id: string): boolean {
    const regexExp =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    return regexExp.test(id);
  }
}
