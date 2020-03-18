import { writable, get } from 'svelte/store';

export const createDappStore = () => {
    let initialized = false;
    let startValue = {};

    const getStore = () => {
        //Set the Coinstore to the value of the chome.storage.local
        chrome.storage.local.get({"dapps": startValue}, function(getValue) {
            initialized = true;
            DappStore.set(getValue.dapps)
        });
    }

    //Create Intial Store
    const DappStore = writable(startValue);

    chrome.storage.onChanged.addListener(function(changes) {
        for (let key in changes) {
            if (key === 'dapps') {
                DappStore.set(changes[key].newValue)
            }
        }
    });

    //Get the value of the dapp Store from chome.storage.local
    getStore()

    let subscribe = DappStore.subscribe;
    let update = DappStore.update;
    let set = DappStore.set;

    return {
        subscribe,
        set,
        update
    };
}

//Networks Stores
export const DappStore = createDappStore();
