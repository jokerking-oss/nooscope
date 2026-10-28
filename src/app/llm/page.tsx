import React from 'react';
import { LayerView } from '@/src/llm/LayerView';
import { InfoButton } from '@/src/llm/WelcomePopup';
import { Header } from '@/src/homepage/Header';

export const metadata = {
    title: 'Transformer Observatory',
    description: 'A 3D instrument for observing a language model execute a forward pass.',
};

export default function Page() {
    return <>
        <Header title="Transformer Observatory" subtitle="forward pass · live">
            <InfoButton />
        </Header>
        <LayerView />
        <div id="portal-container"></div>
    </>;
}
