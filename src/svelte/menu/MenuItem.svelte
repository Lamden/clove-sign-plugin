<script>
    import { getContext  } from 'svelte';

    //Stores
	import { currentPage, needsBackup } from '../../js/stores/stores.js';

    //Context
    const { switchPage } = getContext('app_functions');

    //Props
    export let menuItem;
    export let icons;

    let feedbackURL = "https://docs.google.com/forms/d/e/1FAIpQLSf-X4wWIDLKAJc9tZBV7vZYYD3qyMGMxbTgij1ltmr8CfSxbw/viewform?usp=sf_link"

    $: isSelected = $currentPage.name === menuItem.page.name;
    $: backupPage = menuItem.name === 'Backup Wallet'

    const menuAction = () => {
        if (menuItem.page.name === "LockScreen") {
            chrome.runtime.sendMessage({type: 'lockWallet'});
            return
        }
        if (menuItem.page.name === 'Feedback'){
             window.open(feedbackURL, '_blank');
             return
        }
        switchPage(menuItem.page.name)
    }
</script>

<style>
.item{
    position: relative;
    display:flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
    margin: 2px 0;
    height: 32px;
    padding: 6px 0;
    border-radius: 3px;
}

.floating-label{
    display: none;
}

.item:hover > .floating-label{
    display: block;
    position: absolute;
    top: inherit;
    left: 50px;
    z-index: 100;
    width: 110px;
    background-color: var(--color-grey-2);
    color: var(--font-primary);
    border-radius: 0 4px 4px 0;
    padding: 13px;
    font-weight: 300;
    box-shadow: var(--box-shadow-2);
    -webkit-box-shadow: var(--box-shadow-2);
    -moz-box-shadow: var(--box-shadow-2);
}

.item.selected:hover > .floating-label{
    background-color: var(--primary-color-lighter);
    color: var(--font-primary-inverted);
    border: 1px solid transparent;

}

.item:hover{
     background-color: var(--primary-color-lighter);
}

.notselected:hover{
    background-color: var(--color-grey-2);
}

.logo{
    width: 18px;
    height: 18px;
    margin: 0 auto;
}

.name{
    display: none
}

.selected{
    background-color: var(--primary-color);
    color: var(--font-primary-inverse);
}

.warning{
    color: var(--font-warning);
}

@media (min-width: 900px) {
    .floating-label{
        display: none;
    }
    .item:hover > .floating-label{
        display: none;
        background-color: unset;
    }
    .name{
        display: block;
        font-size: 14px;
        width: 180px;
        line-height: 20px;
    }
    .logo{
        position: relative;
        top: -1px;
        width: 14px;
        height: 14px;
        margin-right: 15px;
    }
}
</style>


<div id={menuItem.id} 
     class="item" 
     class:selected={isSelected} 
     class:notselected={!isSelected} 
     on:click={ () => menuAction() }
    >
    <div class="logo">
        <svelte:component this={icons[menuItem.logo]} width="14px" color={isSelected ? "var(--font-primary-inverse)" : "var(--font-primary)"} />
    </div>
    <span class="name" class:warning={backupPage && $needsBackup}> {menuItem.name} </span>
    <div class="floating-label text-subtitle2 ">
        {menuItem.name}
    </div>
</div>

