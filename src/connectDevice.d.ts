declare type Device = MyObject<'ip' | 'dev' | 'proto' | 'scope' | 'src'>;
export declare function getDeviceLists(): Promise<Device[] | undefined>;
declare function connectDevice(): Promise<void>;
export default connectDevice;
