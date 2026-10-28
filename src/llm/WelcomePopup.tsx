'use client';

import React from 'react';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createContext, useContext, useEffect } from 'react';
import { assignImm } from '@/src/utils/data';
import { KeyboardOrder, useGlobalKeyboard } from '@/src/utils/keyboard';
import { useLocalStorageState } from '@/src/utils/localstorage';
import { ModalWindow } from '@/src/utils/Portal';
import s from './WelcomePopup.module.scss';
import { TocDiagram } from './components/TocDiagram';
import { Subscriptions, useSubscriptions } from '../utils/hooks';

interface IWelcomePopupLS {
    visible: boolean;
}

function hydrateWelcomePopupLS(a?: Partial<IWelcomePopupLS>) {
    return {
        visible: a?.visible ?? true,
    };
}

export const WelcomePopup: React.FC<{}> = () => {
    let ctx = useContext(WelcomeContext);
    useSubscriptions(ctx.subscriptions);
    let [welcomeState, setWelcomeState] = useLocalStorageState('welcome-popup', hydrateWelcomePopupLS);

    useGlobalKeyboard(KeyboardOrder.Modal, ev => {

        if (ev.key === 'Escape') {
            hide();
        }

        ev.stopPropagation();
    });

    useEffect(() => {
        if (ctx.forceVisible) {
            ctx.forceVisible = false;
            setWelcomeState(a => assignImm(a, { visible: true }));
        }
    }, [ctx, setWelcomeState, ctx.forceVisible]);

    function hide() {
        setWelcomeState(a => assignImm(a, { visible: false }));
    }

    if (!welcomeState.visible) {
        return null;
    }

    return <ModalWindow className={s.welcomePanel} backdropClassName={s.modalWindowBackdrop} onBackdropClick={hide}>
        <div className={s.header}>
            <div className={s.title}>An instrument for looking inside a thought</div>
        </div>
        <div className={s.body}>
            <div style={{ width: 600, flex: '0 0 auto', maxWidth: '100%' }}>
                <TocDiagram activePhase={null} onEnterPhase={hide} />
            </div>
            <div className={s.text}>
                <p>This is an interactive 3D visualization of a Large Language Model — the
                    architecture behind GPT-2, GPT-3 and their descendants.</p>
                <p>The model on the bench is a very small one of the same design, small enough
                    that every weight is visible and every operation can be followed by eye.</p>
                <p>Drive it with the walkthrough: a guided pass through the whole forward
                    computation, describing each add, each multiply, and each reshaping of the
                    tensor as it happens.</p>
            </div>
        </div>
        <div className={s.footer}>
            <button className={s.button} onClick={hide}>Begin observation</button>
        </div>
    </ModalWindow>;
};

class WelcomeManager {
    subscriptions = new Subscriptions();
    forceVisible = false;
    showWelcomeDialog() {
        this.forceVisible = true;
        this.subscriptions.notify();
    }
}

let WelcomeContext = createContext(new WelcomeManager());

export const InfoButton: React.FC<{}> = () => {
    let ctx = useContext(WelcomeContext);

    return <div onClick={() => ctx.showWelcomeDialog()} className={s.infoBtn} title="About this instrument">
        <FontAwesomeIcon icon={faCircleQuestion} />
    </div>;
};
