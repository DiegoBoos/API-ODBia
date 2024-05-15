import { Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { PreviousRegistrationDto } from '../dtos';
import { JWtUtil } from 'src/common/utils';
import { MailjetService } from 'src/common/mailjet/mailjet.service';

export class PreviousRegistrationUseCase {
  private readonly logger = new Logger('PreviousRegistrationUseCase');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtUtil: JWtUtil,
    private readonly mailjetService: MailjetService,
  ) {}

  async execute(previousRegistrationDto: PreviousRegistrationDto) {
    const { email, fullName } = previousRegistrationDto;

    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.tenant', 'tenant');

    const user = await queryBuilder.where({ email }).getOne();

    if (user) throw new UnauthorizedException(`The User with email ${email} exists`);

    
    const token = this.jwtUtil.getJwtToken({ email, fullName: fullName || null });

    const previousRegistrationdUrl = `${process.env.FRONTEND_URL}/#/auth/confirm-user/${token}`;

    await this.mailjetService.sendEmail(
      email,
      'Confirmación de Usuario - ODBia',
      '',
      `
      <h3>Confirmación de Usuario - ODBia</h3>
      <br>
      <p>Para confimar el usuario diríjase al siguiente link: ${previousRegistrationdUrl}</p>
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
      message: `Se envió el link de confirmación al correo: ${email}`,
    };
  }
}
