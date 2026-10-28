import s from './Sidebar.module.scss';
import React, { createContext, useContext } from 'react';
import { IProgramState } from './Program';
import { PhaseTimeline } from './PhaseTimeline';
import { Commentary } from './Commentary';
import { useSubscriptions } from '../utils/hooks';

export const WalkthroughSidebar: React.FC = () => {
    let progState = useProgramState();

    return <div className={s.walkthrough}>
        <div className={s.masthead}>
            <div className={s.mastheadRule} />
            <div className={s.mastheadTitle}>Observation Log</div>
            <div className={s.mastheadRule} />
        </div>

        <div className={s.split}>
            <div className={s.timelineLeft}>
                <PhaseTimeline />
            </div>

            <div className={s.content}>
                <Commentary />
            </div>
        </div>
    </div>;
};

export let ProgramStateContext = createContext<IProgramState>(null!);

export function useProgramState() {
    let context = useContext(ProgramStateContext);
    useSubscriptions(context?.htmlSubs);
    return context;
}
