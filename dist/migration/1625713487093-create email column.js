"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
class createEmailColumn1625713487093 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query("ALTER TABLE 'post' ADD 'email' varchar(255) NOT NULL");
            yield queryRunner.query("ALTER TABLE 'user' ADD 'email' varchar(255) NOT NULL");
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query("ALTER TABLE 'post' DROP COLUMN 'email'");
            yield queryRunner.query("ALTER TABLE 'post' DROP COLUMN 'email'");
        });
    }
}
exports.createEmailColumn1625713487093 = createEmailColumn1625713487093;
//# sourceMappingURL=1625713487093-create email column.js.map