import { UseGuards, applyDecorators } from "@nestjs/common";
import { RoleProtected } from "./role-protected.decorator";
import { AuthGuard } from "@nestjs/passport";
import { ValidRoles } from "../interfaces";
import { UserRoleGuard } from "../guards";



export function Auth(...roles: ValidRoles[]) {
    return applyDecorators(
        RoleProtected( ...roles ),
        UseGuards( AuthGuard('jwt-api'), UserRoleGuard )
    );

}