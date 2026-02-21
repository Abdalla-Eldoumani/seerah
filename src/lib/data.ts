import type { EraData, EraId, EraMetadata, SeerahEvent, TimelineNode } from '@/types/seerah';

import preProhpethoodData from '@/data/events/pre-prophethood.json';
import meccanEraData from '@/data/events/meccan-era.json';
import medinanEraData from '@/data/events/medinan-era.json';

const allEraData: EraData[] = [
  preProhpethoodData as EraData,
  meccanEraData as EraData,
  medinanEraData as EraData,
];

const ERA_ID_MAP: Record<string, EraData> = {
  'pre-prophethood': preProhpethoodData as EraData,
  'meccan': meccanEraData as EraData,
  'medinan': medinanEraData as EraData,
};

export function getAllEvents(): SeerahEvent[] {
  return allEraData.flatMap((era) => era.events);
}

export function getEventById(id: string): SeerahEvent | undefined {
  return getAllEvents().find((event) => event.id === id);
}

export function getEventsByEra(eraId: EraId): SeerahEvent[] {
  const eraData = ERA_ID_MAP[eraId];
  return eraData ? eraData.events : [];
}

export function getEraMetadata(eraId: EraId): EraMetadata {
  const eraData = ERA_ID_MAP[eraId];
  return eraData.era;
}

export function getAllEras(): EraMetadata[] {
  return allEraData.map((era) => era.era);
}

export function getEraForEvent(eventId: string): EraMetadata | undefined {
  for (const eraData of allEraData) {
    if (eraData.events.some((e) => e.id === eventId)) {
      return eraData.era;
    }
  }
  return undefined;
}

export function getTimelineNodes(): TimelineNode[] {
  const allEvents = getAllEvents();
  return allEvents.map((event, index) => {
    const era = getEraForEvent(event.id)!;
    const eraEvents = getEventsByEra(era.id);
    const eraIndex = eraEvents.findIndex((e) => e.id === event.id);

    return {
      event,
      era,
      index,
      eraIndex,
      prev: index > 0 ? allEvents[index - 1].id : null,
      next: index < allEvents.length - 1 ? allEvents[index + 1].id : null,
    };
  });
}

export function getAdjacentEvents(eventId: string): {
  prev: SeerahEvent | null;
  next: SeerahEvent | null;
  prevEra: EraMetadata | null;
  nextEra: EraMetadata | null;
} {
  const allEvents = getAllEvents();
  const index = allEvents.findIndex((e) => e.id === eventId);

  if (index === -1) {
    return { prev: null, next: null, prevEra: null, nextEra: null };
  }

  const prev = index > 0 ? allEvents[index - 1] : null;
  const next = index < allEvents.length - 1 ? allEvents[index + 1] : null;

  return {
    prev,
    next,
    prevEra: prev ? getEraForEvent(prev.id) ?? null : null,
    nextEra: next ? getEraForEvent(next.id) ?? null : null,
  };
}

export function getEraIdForEvent(eventId: string): EraId | undefined {
  return getEraForEvent(eventId)?.id;
}
