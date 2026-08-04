'use client';

import { Timeline } from '@/components/today';

export default function HojePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Hoje</h2>
        <p className="text-muted-foreground mt-1">Seu centro de controle acadêmico em tempo real</p>
      </div>

      <Timeline />
    </div>
  );
}