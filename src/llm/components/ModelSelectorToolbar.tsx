import React from 'react';
import { useProgramState } from '../Sidebar';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Vec3 } from '@/src/utils/vector';
import { Mat4f } from '@/src/utils/matrix';
import s from './ModelSelectorToolbar.module.scss';

export const ModelSelectorToolbar: React.FC<{
}> = () => {
    let progState = useProgramState();

    function makeButton(egIndex: number) {

        let example = progState.examples[egIndex] ?? progState.mainExample;

        let isEnabled = example.enabled;
        let isActive = progState.currExampleId === egIndex;

        function handleClick() {
            if (!isEnabled) {
                example.enabled = true;
            }
            progState.currExampleId = egIndex;
            progState.camera.desiredCamera = example.camera;
            progState.markDirty();
        }

        return <button className={clsx(s.subject, isActive && s.subjectActive)} onClick={handleClick}>
            {example.name}
        </button>;
    }

    function onExpandClick() {
        let example = progState.examples[progState.currExampleId] ?? progState.mainExample;
        progState.camera.desiredCamera = example.camera;
        progState.markDirty();
    }

    function onMagnifyClick() {
        let example = progState.examples[progState.currExampleId] ?? progState.mainExample;
        let layout = example.layout ?? progState.layout;

        let obj = layout.residual0;
        let modelTarget = new Vec3(obj.x, obj.y, obj.z);
        let modelMtx = progState.camera.modelMtx.mul(Mat4f.fromTranslation(example.offset))

        let center = modelMtx.mulVec3Proj(modelTarget);
        let zoom = progState.currExampleId === -1 ? 0.7 : 4;
        progState.camera.desiredCamera = {
            center, angle: new Vec3(270, 4.5, zoom),
        };
        progState.markDirty();

    }

    return <div className={s.dock}>
        <div className={s.subjects}>
            {makeButton(0)}
            {makeButton(-1)}
            {makeButton(1)}
            {makeButton(2)}
        </div>
        <div className={s.tools}>
            <button className={s.tool} onClick={onExpandClick} aria-label="Fit view">
                <FontAwesomeIcon icon={faExpand} />
            </button>
            <button className={s.tool} onClick={onMagnifyClick} aria-label="Focus origin">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </div>
    </div>;
};
