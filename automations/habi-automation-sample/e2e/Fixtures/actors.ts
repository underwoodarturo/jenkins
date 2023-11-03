import { test as base } from '@playwright/test';
import { Actor } from '@testla/screenplay-playwright';
import { UseActor } from '../Actors/user';

type MyActors = {
  adminActor: Actor;
  anotherActor: Actor;
};

export const test = base.extend<MyActors>({
  adminActor: async ({ browser, request }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const adminActor = UseActor(
      page,
      request,
      'Admin Actor',
      `${process.env.NX_BASE_USERNAME}`,
      `${process.env.NX_BASE_PASSWORD}`
    );
    await use(adminActor);
  },
  anotherActor: async ({ browser, request }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const anotherActor = UseActor(
      page,
      request,
      'Another Actor Defined By You',
      `${process.env.NX_SR_USERNAME}`,
      `${process.env.NX_SR_PASSWORD}`
    );
    anotherActor.with('page', page);

    await use(anotherActor);
  },
});

export { expect } from '@playwright/test';
