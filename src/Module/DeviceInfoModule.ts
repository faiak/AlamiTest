import { NativeModules } from 'react-native'
const { DeviceInfoModule } = NativeModules

interface DeviceInfoInterface {
  getDeviceId(callback: (deviceId: string) => void): void
}
export default DeviceInfoModule as DeviceInfoInterface
