"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllResidentsDto = void 0;
const residents_1 = require("../../_gen-prisma-classes/residents");
const auth_1 = require("../../_gen-prisma-classes/auth");
const swagger_1 = require("@nestjs/swagger");
class FindAllResidentsDto extends (0, swagger_1.IntersectionType)((0, swagger_1.OmitType)(residents_1.Residents, [
    'Auth',
    'EventNotifications',
    'Notifications',
    'requestsId',
    'Requests',
    'createdAt',
]), (0, swagger_1.PickType)(auth_1.Auth, ['role', 'status'])) {
}
exports.FindAllResidentsDto = FindAllResidentsDto;
//# sourceMappingURL=find-all.residents.dto.js.map