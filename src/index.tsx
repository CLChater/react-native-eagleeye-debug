// src/index.ts
import {NativeModules} from 'react-native';

const {Hawkeye} = NativeModules;

class EagleEyeAgent {
    /**
     * 初始化 EagleEye
     */
    static async init(applyKey: string): Promise<boolean> {
        if (Hawkeye) {
            try {
                return await Hawkeye.init(applyKey);
            } catch (error) {
                console.error('Failed to init from EagleEye:', error);
                throw error;
            }
        } else {
            console.warn('EagleEye module is not available.');
            return Promise.reject('EagleEye module is not available.');
        }
    }

    /**
     * 追踪事件
     * @param trackJson - 事件名称，字符串
     * @param trackJson - 事件数据，JSON 格式的字符串
     * @param isReport - 是否立即上报
     */
    static trackEvent(eventName: string, trackJson: string, isReport: boolean): void {
        if (Hawkeye) {
            Hawkeye.trackEvent(eventName, trackJson, isReport);
        } else {
            console.warn('EagleEye module is not available.');
        }
    }

    /**
     * 设置用户属性
     * @param prop - 用户属性，JSON 格式的字符串
     */
    static userProperty(key: string, value: string): void {
        if (Hawkeye) {
            Hawkeye.userProperty(key, value);
        } else {
            console.warn('EagleEye module is not available.');
        }
    }

    /**
     * 清空所有用户属性
     */
    static cleanAllUserProperties(): void {
        if (Hawkeye) {
            Hawkeye.cleanAllUserProperties();
        } else {
            console.warn('EagleEye module is not available.');
        }
    }

    /**
     * 清空某个用户属性
     */
    static cleanUserProperty(key: string): void {
        if (Hawkeye) {
            Hawkeye.cleanUserProperty(key);
        } else {
            console.warn('EagleEye module is not available.');
        }
    }

    /**
     * 获取设备 ID
     * @returns Promise<string> 返回一个 Promise，解析为字符串 ID
     */
    static async getId(): Promise<string> {
        if (Hawkeye) {
            try {
                return await Hawkeye.getId();
            } catch (error) {
                console.error('Failed to get ID from EagleEye:', error);
                throw error;
            }
        } else {
            console.warn('EagleEye module is not available.');
            return Promise.reject('EagleEye module is not available.');
        }
    }
}

export default EagleEyeAgent;
