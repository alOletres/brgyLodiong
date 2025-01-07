"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllEventsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const events_1 = require("./../../_gen-prisma-classes/events");
class FindAllEventsDto extends (0, swagger_1.OmitType)(events_1.Events, [
    'EventNotifications',
]) {
}
exports.FindAllEventsDto = FindAllEventsDto;
//# sourceMappingURL=findall-events.dto.js.map