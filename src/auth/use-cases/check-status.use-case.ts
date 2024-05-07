import { Injectable, Logger } from '@nestjs/common';

import { JWtUtil } from 'src/common/utils';
import { UserAccount } from '../interfaces';

@Injectable()
export class CheckStatusUseCase {
  private readonly logger = new Logger('CheckStatusUseCase');

  constructor(
    private readonly jwtUtil: JWtUtil,
  ) {}

  async execute(user: UserAccount) {
    const token = this.jwtUtil.getJwtToken({
      tenantId: user.tenantId,
      userId: user.userId,
    });

    return {
      token,
      user: {
        email: user.email,
        fullName: user.fullName,
      },
    };
  }
}
