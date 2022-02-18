"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDeviceCommand = void 0;
const child_process_1 = require("child_process");
const commander_1 = require("commander");
function getDeviceLists() {
    return new Promise(resolve => {
        (0, child_process_1.exec)('adb shell ip route', (err, stdout) => {
            if (err) {
                console.error('error: No devices/emulators found');
            }
            else {
                const devices = stdout
                    .split(/\n/g)
                    .map(d => {
                    let key = 'ip';
                    const device = d.split(' ').reduce((ret, s, i) => {
                        if (i % 2 === 1)
                            key = s;
                        else
                            ret[key] = s;
                        return ret;
                    }, {});
                    if (device.src)
                        return device;
                    else
                        return {};
                })
                    .filter(d => d?.src);
                resolve(devices);
            }
        });
    });
}
async function connectDevice({ target }) {
    const devices = await getDeviceLists();
    if (devices?.length > 0) {
        const selectedDevice = devices.filter((a) => a?.dev === target);
        if (selectedDevice.length > 0) {
            (0, child_process_1.exec)(`adb disconnect; adb tcpip 5555; adb connect ${selectedDevice[0].src}:5555`, (err, msg) => {
                if (err)
                    console.error(err);
                else
                    console.log(msg);
            });
        }
        else
            console.error('error: No devices/emulators found');
    }
}
const connectDeviceCommand = () => commander_1.program
    .command('connect')
    .description('Connect your physical device using adb wireless')
    .action(connectDevice)
    .addOption(new commander_1.Option('-t, --target <target>', 'target').default('wlan0'));
exports.connectDeviceCommand = connectDeviceCommand;
