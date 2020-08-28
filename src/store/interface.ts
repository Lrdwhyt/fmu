import { getInterfaceData } from '@/LocalStorageManager';
import { ActionContext } from 'vuex';

interface Store {
    isSettingsPanelOpen: boolean;
    gamePanel: string;
    settingsPanel: string;
}

export default {
    state: {
        isSettingsPanelOpen: false,
        gamePanel: "GameConfigPanel",
        settingsPanel: "GeneralSettingsPanel"
    } as Store,

    mutations: {
        toggleSettingsPanel(state: Store): void {
            state.isSettingsPanelOpen = !state.isSettingsPanelOpen
        },

        setIsSettingsPanelOpen(state: Store, isOpen: boolean): void {
            state.isSettingsPanelOpen = isOpen;
        },

        setGamePanel(state: Store, component: string): void {
            state.gamePanel = component;
        },

        setSettingsPanel(state: Store, component: string): void {
            state.settingsPanel = component;
        }
    },

    actions: {
        init(context: ActionContext<Store, any>): void {
            const interfaceData: Store = getInterfaceData();

            if ("isSettingsPanelOpen" in interfaceData) {
                context.commit("setIsSettingsPanelOpen", interfaceData.isSettingsPanelOpen);
            }

            if ("gamePanel" in interfaceData) {
                context.commit("setGamePanel", interfaceData.gamePanel);
            }

            if ("settingsPanel" in interfaceData) {
                context.commit("setSettingsPanel", interfaceData.settingsPanel);
            }
        }
    },

    getters: {
        isSettingsPanelOpen(state: Store): boolean {
            return state.isSettingsPanelOpen;
        },

        gamePanel(state: Store): string {
            return state.gamePanel;
        },

        settingsPanel(state: Store): string {
            return state.settingsPanel;
        }
    }
}