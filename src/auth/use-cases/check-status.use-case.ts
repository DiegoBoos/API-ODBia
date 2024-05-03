import { Injectable, Logger } from '@nestjs/common';

import { User } from '../entities';
import { JWtUtil } from 'src/common/utils';

@Injectable()
export class CheckStatusUseCase {
  private readonly logger = new Logger('CheckStatusUseCase');

  constructor(
    private readonly jwtUtil: JWtUtil,
  ) {}

  async execute(user: User) {
    const token = this.jwtUtil.getJwtToken({
      tenantId: user.tenantId,
      userId: user.id,
    });

    return {
      token,
      user: {
        email: user.email,
        fullName: user.tenant.fullName,
      },
    };
  }
}
