/**
 * The help hub: permanent problem pages for repair-intent searches.
 *
 * Strategy (Aug 2026 data panel): "gas engineer <town>" SERPs are walled by
 * directories, ads and the map pack, but problem searches ("boiler losing
 * pressure", "vaillant f28") have organic-first SERPs, and repair-intent
 * visitors convert to enquiries better than any other traffic the site gets.
 *
 * Content rules: Jamie's voice (first person, plain, no em dashes), only
 * homeowner actions that are genuinely safe and legal (no gas work, never
 * open the boiler case), every page routes to a Gas Safe engineer for the
 * rest, and gas smells always go to the National Gas Emergency line first.
 */

export type HelpFaq = { q: string; a: string };

export type HelpSection = {
  heading: string;
  body: string;
};

export type FaultCode = {
  code: string;
  meaning: string;
  advice: string;
};

export type HelpPage = {
  slug: string;
  navTitle: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  /** What's actually going on: short cause sections. */
  causes: HelpSection[];
  /** Safe things to try first. Numbered on the page. Empty = straight to engineer. */
  checks: string[];
  checksHeading?: string;
  /** When to stop and get an engineer in. */
  stopAndCall: string[];
  /** Only the Vaillant codes page uses this. */
  faultCodes?: FaultCode[];
  faqs: HelpFaq[];
  /** Prefilled WhatsApp message so the enquiry arrives with context. */
  whatsappText: string;
};

export const HELP_PAGES: HelpPage[] = [
  {
    slug: "boiler-losing-pressure",
    navTitle: "Boiler losing pressure",
    metaTitle: "Boiler Losing Pressure? What to Check | JDH Gas",
    metaDescription:
      "Why your boiler keeps losing pressure, how to safely top it back up to 1 to 1.5 bar, and when a pressure drop means a leak that needs a Gas Safe engineer.",
    eyebrow: "Boiler help",
    h1: "Boiler losing pressure?",
    lead: "A boiler that keeps dropping below 1 bar usually has a small leak somewhere in the system. Topping it up is safe to do yourself, and I'll show you how. But if you're topping up more than once a month or so, something is letting water out and it needs finding.",
    causes: [
      {
        heading: "What the pressure gauge is telling you",
        body: "Sealed heating systems run at around 1 to 1.5 bar when cold. Below about 0.5 bar most boilers lock out and stop heating, and some show a fault code for it (F22 on a Vaillant, for example). Pressure does drift down slowly over months, and bleeding radiators drops it too. That's normal. A fast or repeated drop is not.",
      },
      {
        heading: "Where the water usually goes",
        body: "The common culprits are a weeping radiator valve, a pinhole in pipework under the floor, or a failing expansion vessel inside the boiler. A tired relief valve letting water out through the overflow pipe outside is another regular. Some are inexpensive fixes. All of them need a qualified engineer to locate and repair properly.",
      },
    ],
    checksHeading: "How to top the pressure back up",
    checks: [
      "Let the boiler cool down. Pressure reads higher when the system is hot, so always judge it cold.",
      "Find the filling loop. It's usually a braided silver hose under the boiler with one or two small valves, though some boilers have a built-in filling key instead. Your manual will show which you have.",
      "Open the valve(s) slowly. You'll hear water flowing in and see the gauge climb.",
      "Stop at around 1.2 bar, and no higher than 1.5 when cold. If you overshoot, bleed a radiator briefly to let some water back out.",
      "Close the valves fully, then reset the boiler if it was showing a fault.",
    ],
    stopAndCall: [
      "You're topping up more than about once a month. That's a leak.",
      "The pressure drops within hours or days of topping up.",
      "You can see water: under the boiler, from the copper overflow pipe outside, or a damp patch on a ceiling or floor.",
      "The gauge swings high when the heating runs, then drops right back. That points at the expansion vessel.",
      "The filling loop is missing, seized, or won't shut off properly.",
    ],
    faqs: [
      {
        q: "What pressure should my boiler be?",
        a: "Around 1 to 1.5 bar when the system is cold. It will rise a little when the heating is running. If it's regularly below 1 or above 2.5, get it looked at.",
      },
      {
        q: "Is it safe to keep topping up a boiler that loses pressure?",
        a: "Topping up now and then is fine. Doing it every week isn't: fresh water brings oxygen and minerals into the system, which corrode radiators and clog the boiler over time. Cheaper to fix the leak than to replace what the leak ruins.",
      },
      {
        q: "Why did my pressure drop after bleeding radiators?",
        a: "Bleeding lets air out of the system, and the water that replaces the air lowers the overall pressure. That's expected. Just top back up to about 1.2 bar afterwards.",
      },
    ],
    whatsappText: "Hi Jamie, my boiler keeps losing pressure. ",
  },
  {
    slug: "no-hot-water",
    navTitle: "No hot water",
    metaTitle: "No Hot Water From Your Boiler? What to Check | JDH Gas",
    metaDescription:
      "No hot water but the heating works, or neither? The checks worth doing before you call anyone, and the faults that need a Gas Safe engineer to fix.",
    eyebrow: "Boiler help",
    h1: "No hot water?",
    lead: "Start with the simple checks. A good share of no-hot-water calls turn out to be a tripped switch, a timer that has lost its settings, or a prepayment meter that has run out. Five minutes of checking can save you a callout. If it's none of those, the likely faults below are engineer jobs.",
    causes: [
      {
        heading: "Hot water gone but heating still works (or the other way round)",
        body: "On a combi boiler that split usually points at the diverter valve, the part that switches the boiler between heating the radiators and heating your tap water. They wear out, and it's a common repair on boilers more than ten years old. On a system with a hot water cylinder, a failed motorised valve or cylinder thermostat has the same effect.",
      },
      {
        heading: "No heating and no hot water at all",
        body: "If the boiler is dead or locked out, work through the checks below before assuming the worst. Power, gas, pressure and a frozen condensate pipe in winter cover most of it. If the boiler is on but locked out with a fault code, note the code down before you reset: it tells me a lot before I arrive.",
      },
    ],
    checksHeading: "Worth checking before you call",
    checks: [
      "Power: is the boiler display on? Check the fused spur switch next to the boiler and your consumer unit for a tripped breaker.",
      "Gas: do the hob or other gas appliances work? If you're on a prepayment meter, check there's credit.",
      "Controls: check the room thermostat has battery and is turned up, and that the timer or programmer hasn't lost its schedule after a power cut.",
      "Pressure: if the gauge is below about 0.5 bar, top it up to around 1.2 bar. My boiler losing pressure guide walks you through it.",
      "In freezing weather: a frozen condensate pipe locks most modern boilers out. See my frozen condensate pipe guide, it's a two-minute fix.",
      "One reset: if there's a fault code, reset the boiler once. If the code comes straight back, stop there and note it down.",
    ],
    stopAndCall: [
      "The same fault code returns after one reset. Repeated resetting can mask a real fault, so once is enough.",
      "Water runs hot then cold then hot at the tap. Classic diverter valve or heat exchanger trouble on a combi.",
      "The boiler fires for a few seconds then cuts out every time.",
      "You have a cylinder and it's lukewarm at best. Could be the valve, the stat, or the immersion backup masking a boiler fault.",
      "Anything that involves opening the boiler case. That is Gas Safe work by law.",
    ],
    faqs: [
      {
        q: "Why do I have heating but no hot water?",
        a: "On a combi it's most often the diverter valve sticking in the heating position. It's a well-known fault, parts are usually available, and it's a routine repair. On a cylinder system it's usually a motorised valve or thermostat.",
      },
      {
        q: "My boiler works but the water goes cold quickly. Same problem?",
        a: "Often, yes. A sticking diverter valve or a scaled-up heat exchanger both cause hot-cold-hot water on combis. Worth a proper look rather than living with it.",
      },
      {
        q: "Should I keep resetting the boiler to get hot water back?",
        a: "One reset is fine. If the fault comes back, repeated resets just stress the boiler and can hide what's actually wrong. Note the fault code and get it looked at.",
      },
    ],
    whatsappText: "Hi Jamie, I've got no hot water. ",
  },
  {
    slug: "radiators-cold-at-bottom",
    navTitle: "Radiators cold or patchy",
    metaTitle: "Radiators Cold at the Bottom or Top? | JDH Gas",
    metaDescription:
      "Cold at the top means air and you can bleed it yourself. Cold at the bottom means sludge, and that needs a proper flush. How to tell which you have.",
    eyebrow: "Heating help",
    h1: "Radiators cold at the bottom, or the top?",
    lead: "Where the cold patch sits tells you what's wrong. Cold at the top is air, and you can fix that yourself in ten minutes with a bleed key. Cold at the bottom or the middle is sludge, and no amount of bleeding will shift it. Here's how to tell them apart and what to do about each.",
    causes: [
      {
        heading: "Cold at the top: air in the system",
        body: "Air rises, collects at the top of the radiator, and stops hot water filling that space. Common after the summer off-season, after topping up pressure, or after any work on the system. Bleeding it out is a normal bit of home maintenance and completely safe.",
      },
      {
        heading: "Cold at the bottom or middle: sludge",
        body: "Sludge is rust and debris from inside your radiators and pipes. It's heavier than water, settles at the bottom, and blocks the flow. It builds for years, quietly making every room slower to heat and your gas bill bigger. The fix is a chemical or power flush of the system, plus a magnetic filter to stop it coming back. That is a job for an engineer, not a bleed key.",
      },
      {
        heading: "One radiator cold, or the whole house slow",
        body: "One cold radiator is often a stuck thermostatic valve pin or a balancing issue. Every radiator lukewarm points at circulation: a tired pump, a blocked filter, or sludge through the whole system.",
      },
    ],
    checksHeading: "How to bleed a radiator (for cold-at-the-top)",
    checks: [
      "Turn the heating off and let the radiators cool. Bleeding with the pump running pulls more air in.",
      "Put a cloth and a small bowl under the bleed valve at the top corner of the radiator.",
      "With a bleed key, turn the valve slowly anticlockwise about a quarter turn. You'll hear air hissing out.",
      "Close it the moment water dribbles out steadily.",
      "Check the boiler pressure afterwards and top up to about 1.2 bar if it's dropped.",
    ],
    stopAndCall: [
      "The cold patch is at the bottom or middle. That's sludge, and bleeding won't touch it.",
      "You're having to bleed the same radiator every few weeks. Air shouldn't keep getting in, and constant topping up feeds corrosion.",
      "The water that comes out when bleeding is black or brown. That is sludge.",
      "Radiators upstairs are hot but downstairs are cold, or the reverse. Circulation or balancing, an engineer job either way.",
      "Every room heats slowly and the boiler seems to work hard. A flush and filter often transforms an older system.",
    ],
    faqs: [
      {
        q: "Do I need a power flush or a chemical flush?",
        a: "Depends how bad the sludge is and how the system is put together. A chemical clean sorts lighter cases. Heavier blockages need a power flush. I'll say which yours actually needs after a look, and fit a magnetic filter so you don't pay for this twice.",
      },
      {
        q: "How much does it cost to fix radiators cold at the bottom?",
        a: "It varies with system size and how blocked things are, so I don't quote without seeing it. Message me a photo and a rough idea of your setup and I'll give you a straight price before any work.",
      },
      {
        q: "Is sludge actually damaging or just annoying?",
        a: "Damaging. It wears the pump, blocks the boiler's heat exchanger, and shortens the boiler's life. Boiler warranties often expect the system to be kept clean too. Fixing it is cheaper than the parts it ruins.",
      },
    ],
    whatsappText: "Hi Jamie, my radiators aren't heating properly. ",
  },
  {
    slug: "boiler-making-banging-noises",
    navTitle: "Boiler making noises",
    metaTitle: "Boiler Making Banging or Gurgling Noises? | JDH Gas",
    metaDescription:
      "Kettling, banging, gurgling or whistling from your boiler: what each noise usually means, what's safe to check, and when to get a Gas Safe engineer in.",
    eyebrow: "Boiler help",
    h1: "Boiler making banging, gurgling or whistling noises?",
    lead: "Boilers are never silent, but they shouldn't rumble like a kettle or bang when they start up. The noise is a symptom, and different noises point at different faults. None of them fix themselves, and most become more expensive the longer they are left.",
    causes: [
      {
        heading: "Rumbling or whistling like a kettle",
        body: "The trade calls this kettling. Limescale or sludge builds up on the heat exchanger, water gets trapped against the hot metal and boils where it shouldn't. It strains the boiler, wastes gas, and it's the classic sound of a system that's overdue a clean.",
      },
      {
        heading: "Banging or clunking",
        body: "Sudden bangs are often trapped air moving through the system, a pump problem, or pipes expanding and knocking against joists. A single clunk when the heating starts is usually pipework. Repeated banging from the boiler itself needs looking at promptly.",
      },
      {
        heading: "Gurgling",
        body: "Water and air mixing where they shouldn't. A gurgling radiator needs bleeding. A gurgling boiler can be air, low pressure, or in winter a partly frozen condensate pipe outside.",
      },
      {
        heading: "Humming or vibrating",
        body: "Often the pump running too fast or working loose, sometimes a vibrating pipe clip. Not usually urgent, but a pump on its way out is better replaced on your schedule than during a cold snap.",
      },
    ],
    checksHeading: "Safe things to check first",
    checks: [
      "Check the pressure gauge. Low pressure causes odd noises, and topping up to about 1.2 bar is a safe DIY job.",
      "Bleed any gurgling radiators. My radiator guide covers it step by step.",
      "In freezing weather, look at the white plastic condensate pipe outside for ice. A frozen one causes gurgling and lockouts.",
      "Note when the noise happens: on startup, when hot water runs, or constantly. That detail helps the diagnosis more than you'd think.",
    ],
    stopAndCall: [
      "Kettling. The scale won't dissolve on its own, and the fix is a proper clean of the system and heat exchanger.",
      "Banging from inside the boiler itself, especially with a fault code or lockouts.",
      "The noise came on suddenly and the boiler's performance changed with it.",
      "Any noise together with visible leaking or dropping pressure.",
    ],
    faqs: [
      {
        q: "Is a kettling boiler dangerous?",
        a: "It's not usually an immediate danger, but it's a boiler under real strain. Left alone it shortens the heat exchanger's life, which is one of the priciest parts in the box. Sooner is cheaper.",
      },
      {
        q: "Why does my boiler bang when the heating comes on?",
        a: "A single knock is often pipes expanding as they warm. Repeated banging at startup can be air, a pump fault, or delayed ignition, and that last one definitely wants a Gas Safe engineer's eyes on it.",
      },
      {
        q: "Will an annual service catch these noises early?",
        a: "Usually, yes. Most noisy-boiler calls I attend would have been caught at a service before they got loud. An annual service is from £85 for new customers.",
      },
    ],
    whatsappText: "Hi Jamie, my boiler is making a strange noise. ",
  },
  {
    slug: "boiler-leaking-water",
    navTitle: "Boiler leaking water",
    metaTitle: "Boiler Leaking Water? Do This First | JDH Gas",
    metaDescription:
      "A leaking boiler wants attention the same day. What to switch off, what the leak usually is, and why you shouldn't run a boiler that's dripping.",
    eyebrow: "Boiler help",
    h1: "Boiler leaking water?",
    lead: "Water where it shouldn't be is the one boiler problem I would ask you not to leave. Water and the electrics inside a boiler are a bad mix, and a small drip can be hiding a bigger fault. The good news: most leaks come down to replaceable parts rather than the end of the boiler.",
    causes: [
      {
        heading: "Where boiler leaks come from",
        body: "The usual suspects are a relief valve passing water because system pressure is too high, a perished pump seal, or corroded fittings under the boiler. The worst case is a cracked heat exchanger. A drip from the copper pipe that exits through the wall outside is the relief valve doing its job, which still means something upstream needs sorting.",
      },
      {
        heading: "Why you shouldn't just catch it in a bowl",
        body: "Leaking water tracks onto electrical components, rusts the boiler from the inside, and can bring ceilings down if the boiler is upstairs. A bowl buys you a day at best. A boiler left running while it leaks can turn a cheap seal into an expensive circuit board.",
      },
    ],
    checksHeading: "What to do right now",
    checks: [
      "Check the pressure gauge. If it's well above 2.5 bar, the relief valve may be dumping the excess. Don't add more water.",
      "Switch the boiler off at its fused spur if water is dripping onto or near it.",
      "If the leak is strong, close the service valves on the pipes under the boiler if you can see them. Turn off the cold main if it keeps coming.",
      "Put something down to protect the floor and take a photo of where it's coming from. A photo saves me guesswork and you money.",
      "Message or call me with the photo. Leaks go to the top of my list.",
    ],
    stopAndCall: [
      "Any leak from the boiler itself, even a slow drip, is a reason to call.",
      "Water coming through a ceiling below the boiler: switch off and call now.",
      "The outside overflow pipe drips constantly, not just occasionally.",
      "The boiler still runs but pressure keeps vanishing. That's a leak you can't see yet.",
    ],
    faqs: [
      {
        q: "Is a leaking boiler an emergency?",
        a: "It's urgent rather than an emergency, unless water is near electrics or coming through a ceiling, in which case switch the boiler off at the spur straight away. If you ever smell gas, that is an emergency: call the National Gas Emergency line on 0800 111 999.",
      },
      {
        q: "Does a leak mean I need a new boiler?",
        a: "Usually not. Valves, seals and fittings are all replaceable. A cracked heat exchanger on an older boiler is the case where we'd talk honestly about repair cost against replacement.",
      },
      {
        q: "Can I keep using the heating with a small drip?",
        a: "I wouldn't. Water finds the electronics, and the fault behind the drip tends to grow. Switch off, send me a photo, and let's get it sorted properly.",
      },
    ],
    whatsappText: "Hi Jamie, my boiler is leaking water. ",
  },
  {
    slug: "frozen-condensate-pipe",
    navTitle: "Frozen condensate pipe",
    metaTitle: "Frozen Condensate Pipe: the 2-Minute Fix | JDH Gas",
    metaDescription:
      "Boiler locked out in freezing weather with a gurgle and a fault code? The outside condensate pipe is probably frozen. How to thaw it safely and stop it recurring.",
    eyebrow: "Winter help",
    h1: "Boiler stopped in cold weather? Check the condensate pipe",
    lead: "Every cold snap, this is the fault I get called about most. Modern boilers drain a little acidic water through a plastic pipe, and where that pipe runs outside it can freeze solid. The boiler senses the blockage and shuts down to protect itself. The fix is usually a jug of warm water.",
    causes: [
      {
        heading: "How to know this is your problem",
        body: "It's below zero outside, the boiler has locked out, and you may hear a gurgling sound from it. Many boilers show a specific code: F28 or F29 on a Vaillant, EA on a Worcester. Follow the white or grey plastic pipe from the boiler: if it goes through the wall and down outside, that's the suspect.",
      },
    ],
    checksHeading: "How to thaw it safely",
    checks: [
      "Boil the kettle, then let it sit a couple of minutes. You want warm to hot water, never boiling, which can crack the plastic.",
      "Pour it slowly along the outside pipe, concentrating on the end, any bends, and anywhere it looks frosted. A hot water bottle held on the pipe works too.",
      "Never use a blowtorch or heat gun, and don't climb for a high pipe. If you can't reach it safely from the ground, leave it for me.",
      "Once thawed, reset the boiler. It should fire up normally.",
      "If it refreezes the same week, the pipe needs insulating or rerouting. That's a small, permanent fix I can do.",
    ],
    stopAndCall: [
      "The boiler won't reset after thawing, or shows a different fault code.",
      "The pipe is out of safe reach from the ground.",
      "It freezes again every cold night. Lagging or rerouting the pipe fixes it for good, and it's a quick job.",
      "You're not confident which pipe is which. A quick message is better than a cracked pipe.",
    ],
    faqs: [
      {
        q: "What does a condensate pipe do?",
        a: "A modern condensing boiler recovers extra heat from its flue gases, which produces a small, steady trickle of mildly acidic water. The condensate pipe drains that away, usually to a drain inside or outside. It is normal and means the boiler is running efficiently.",
      },
      {
        q: "How do I stop the condensate pipe freezing again?",
        a: "Foam pipe insulation on the outside run helps a lot, and increasing the pipe's fall or diameter, or rerouting it to an inside drain, sorts stubborn cases. I fit lagging in minutes on a service visit.",
      },
      {
        q: "My boiler locked out in the cold but the pipe isn't frozen. Now what?",
        a: "Note the fault code, try one reset, and if it comes back get in touch. Cold snaps also expose weak ignition parts and struggling pumps, so the code matters.",
      },
    ],
    whatsappText: "Hi Jamie, I think my condensate pipe is frozen and the boiler has locked out. ",
  },
  {
    slug: "vaillant-boiler-fault-codes",
    navTitle: "Vaillant fault codes",
    metaTitle: "Vaillant Fault Codes Explained (F22, F28, F75) | JDH Gas",
    metaDescription:
      "What Vaillant fault codes F22, F23, F24, F27, F28, F29, F54 and F75 mean, which ones you can safely sort yourself, and when to call a Gas Safe engineer.",
    eyebrow: "Vaillant help",
    h1: "Vaillant fault codes explained",
    lead: "I'm a Vaillant approved partner and I work on these boilers most weeks, so these are the codes I get called about most. A couple you can safely sort yourself in ten minutes. The rest mean the boiler needs a professional, and repeated resets won't change that.",
    causes: [
      {
        heading: "Before you do anything",
        body: "Note the exact code down, try one reset at most, and never take the case off the boiler. Everything behind the case is Gas Safe territory by law. If you ever smell gas, skip everything below and call the National Gas Emergency line on 0800 111 999 first.",
      },
    ],
    checks: [],
    faultCodes: [
      {
        code: "F22",
        meaning: "Low water pressure. The system has dropped below about 0.5 bar.",
        advice: "Safe to sort yourself: top the system up to around 1.2 bar using the filling loop. My boiler losing pressure guide walks through it. If F22 keeps returning, there's a leak to find.",
      },
      {
        code: "F23",
        meaning: "Big temperature difference between the flow and return pipes, usually circulation.",
        advice: "Points at a struggling pump or restricted flow, often sludge. Engineer job.",
      },
      {
        code: "F24",
        meaning: "Temperature rising too fast, again usually circulation or a blockage.",
        advice: "Same family as F23. Check the pressure is around 1.2 bar, then it's one for me.",
      },
      {
        code: "F27",
        meaning: "Flame detected when there shouldn't be one, a sensor or gas valve issue.",
        advice: "Straight to an engineer. Don't keep resetting this one.",
      },
      {
        code: "F28",
        meaning: "The boiler failed to ignite when starting up.",
        advice: "Check other gas appliances work and any prepayment meter has credit. In freezing weather check the condensate pipe isn't frozen. One reset. If it returns, it's ignition parts or gas supply, an engineer job.",
      },
      {
        code: "F29",
        meaning: "The flame went out during operation.",
        advice: "Same checks as F28: gas supply, meter credit, frozen condensate in winter. Recurring F29 needs proper fault-finding.",
      },
      {
        code: "F54",
        meaning: "Gas supply fault.",
        advice: "Check the gas meter and other appliances. If supply looks fine, the boiler needs a Gas Safe engineer to investigate. Never poke at gas valves yourself.",
      },
      {
        code: "F75",
        meaning: "The pump ran but the boiler didn't sense the pressure change. Pump or pressure sensor.",
        advice: "The best-known ecoTEC code. Sometimes eased briefly by topping pressure up, but the sensor or pump needs replacing properly. Book it in before it leaves you without heating.",
      },
    ],
    stopAndCall: [
      "Any code that comes back after one reset.",
      "F27, F54, or anything gas-related. These are never DIY.",
      "Codes you don't see listed here: message me the code and I'll tell you what it means.",
      "A boiler locking out repeatedly with no code at all.",
    ],
    faqs: [
      {
        q: "Is it safe to keep resetting a Vaillant fault code?",
        a: "One reset is reasonable. After that you're masking the fault, stressing components, and on ignition faults the boiler will eventually lock out hard anyway. Note the code and get it diagnosed.",
      },
      {
        q: "Do you only work on Vaillant boilers?",
        a: "No, I work on all the major makes including Worcester Bosch, Ideal and Baxi. Vaillant approved partner just means extra manufacturer training and backing on that brand.",
      },
      {
        q: "My Vaillant is under warranty. Should I still call you?",
        a: "If it's in warranty, a manufacturer engineer may be your cheapest route and I'll tell you so. An annual service, which I can do, is usually what keeps that warranty valid in the first place.",
      },
    ],
    whatsappText: "Hi Jamie, my Vaillant boiler is showing a fault code. ",
  },
];

export function getHelpPage(slug: string): HelpPage | undefined {
  return HELP_PAGES.find((p) => p.slug === slug);
}

export function helpUrl(slug: string): string {
  return `/help/${slug}`;
}
