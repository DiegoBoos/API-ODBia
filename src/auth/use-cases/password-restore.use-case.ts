import { Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { PasswordRestoreDto } from '../dtos';
import { JWtUtil } from 'src/common/utils';
import { MailjetService } from 'src/common/mailjet/mailjet.service';

export class PasswordRestoreUseCase {
  private readonly logger = new Logger('FindUserUseCase');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtUtil: JWtUtil,
    private readonly mailjetService: MailjetService,
  ) {}

  async execute(passwordRestoreDto: PasswordRestoreDto) {
    const { email } = passwordRestoreDto;
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.tenant', 'tenant');

    const user = await queryBuilder.where({ email }).andWhere('password IS NOT NULL').getOne();

    if (!user) throw new UnauthorizedException(`The User with email ${email} no exists`);

    
    const token = this.jwtUtil.getJwtToken({ tenantId: user.tenantId, userId: user.id });

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/#/auth/reset-password/${token}`;

    await this.mailjetService.sendEmail(
      email,
      'Restauración de contraseña - ODBia',
      '',
      `
      <h3>Restaurar contraseña - ODBia</h3>
      <br>
      <p>Para restaurar la contraseña diríjase al siguiente link: ${resetPasswordUrl}</p>
      `,
      [
        // {
        //   ContentType: 'image/png',∫
        //   Filename: 'imagen.png',
        //   Base64Content: 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==', // Ejemplo de imagen en base64
        // }
      ],
    );

    return {
      message: `Se envió el link de restauración de contraseña al correo: ${email}`,
    };
  }
}
