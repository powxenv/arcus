export type ResultDetail = {
  meaning: string;
  howToRead: string;
  distinct: string;
  // How this tends to show up in everyday life — concrete, second-person, no jargon.
  everyday?: string;
};

export const RESULT_DETAILS: Record<string, Record<string, ResultDetail>> = {
  solstice: {
    Summer: {
      meaning:
        "Your energy runs bright and moves outward. You probably feel most yourself when you can act, connect, and put visible effort into the world around you.",
      everyday:
        "This often shows up as being the one who gets things moving — speaking first, volunteering, saying yes. Activity tends to recharge you rather than drain you, and people may read you as 'switched on.' In quieter stretches you might notice a low restlessness, an itch for something to push against.",
      howToRead:
        "Think of this as a season of available momentum. If your direction is gathering, that momentum is still building and new commitments may come easily. If it's settling, the same outward energy is there, but something in you is starting to turn inward and consolidate.",
      distinct:
        "Summer shares its brightness with Autumn, but moves outward where Autumn turns in. It shares its outwardness with Spring, but with more immediate force.",
    },
    Autumn: {
      meaning:
        "Your energy runs bright, but it turns inward. There's real intensity here — it's just selective, focused on sorting, finishing, and deciding what matters.",
      everyday:
        "You may find yourself pulling back from scattered commitments and going deep on a few. People might describe you as intense or hard to read, even when you feel busy inside. This is often a productive, consolidating phase — editing your life down to what's worth keeping.",
      howToRead:
        "There's energy here, but less appetite for exposure. You might be busy internally: deciding what to keep, what to release, what to transform into something useful.",
      distinct:
        "Autumn shares Summer's brightness, but not its outwardness. It shares Winter's inward turn, but with more charge behind it.",
    },
    Winter: {
      meaning:
        "Your energy runs quiet and inward. This isn't emptiness — it's the part of the cycle where restoration, depth, and private reflection come forward.",
      everyday:
        "You may prefer fewer, deeper interactions and need real downtime to feel like yourself. Others might assume you're tired or distant when actually you're recharging and thinking things through. Pushing against this season tends to backfire; leaning into rest tends to restore you.",
      howToRead:
        "Notice what becomes clearer when you stop pushing. If your direction is gathering, energy may be slowly returning. If it's settling, this is a natural time to rest and integrate before the cycle turns.",
      distinct:
        "Winter sits opposite Summer — quieter where Summer is bright, inward where Summer reaches out. It's softer than Autumn, with less charge behind it.",
    },
    Spring: {
      meaning:
        "Your energy is quiet but beginning to move outward. It often feels tentative, curious, and gently drawn toward contact and new possibility.",
      everyday:
        "You might notice the first signs of wanting to engage again — a small initiative here, a little more social openness there. It's not full force yet, and that's the point. This is a season of beginnings, where small risks and fresh interests deserve protection rather than pressure.",
      howToRead:
        "Read this as emergence rather than weakness. You may not have Summer's force yet, but the appetite is returning: small initiatives, curiosity, a desire to begin again.",
      distinct:
        "Spring shares Winter's quietness, but reaches outward where Winter turns in. It shares Summer's outwardness, but at an earlier, more delicate stage.",
    },
    Threshold: {
      meaning:
        "Your energy sits close to the middle — not clearly one season or another, but somewhere between.",
      everyday:
        "You may feel adaptable by nature, shifting between bright and quiet, inward and outward, depending on the situation. The tradeoff is that no single season claims you, which can feel balanced or, at times, hard to locate yourself.",
      howToRead:
        "Sitting near the middle can mean genuine balance, or two strong pulls quietly cancelling each other out. The dimension scores below will show which.",
      distinct:
        "The Threshold isn't a fifth season — it's the space between them, where the wheel turns.",
    },
  },
  turing: {
    "The Integrator": {
      meaning:
        "You engage both careful reasoning and intuition, and you trust both. Analysis isn't the whole story for you — gut feel is real information too.",
      everyday:
        "In decisions, you might talk through the logic and then check it against a feeling. You can enjoy a hard problem and still go with a hunch when the evidence runs out. The strength is flexibility; the risk is second-guessing when the two modes disagree.",
      howToRead:
        "This isn't about using both equally in every decision. It's that you have access to both, and your best calls often come from matching the mode to the moment.",
      distinct:
        "Compared to the Logician, you give intuition more weight. Compared to the Reader, you enjoy the deliberate thinking more.",
    },
    "The Logician": {
      meaning:
        "You prefer to think things through — explicit reasoning, evidence, and careful comparison. You tend to feel surer when a conclusion can be explained step by step.",
      everyday:
        "You're the one who wants to see the reasoning, not just the answer. In groups you may slow things down to make sure the logic holds. This is a strength in complex or high-stakes moments; the cost is that you can talk yourself past a perfectly good instinct.",
      howToRead:
        "Notice when you dismiss a gut feeling just because you can't yet articulate it. Sometimes the instinct is ahead of the explanation.",
      distinct:
        "You share the Integrator's taste for thinking, but trust gut less. You're more reflective than the Operator, who tends to act first.",
    },
    "The Reader": {
      meaning:
        "You're guided by intuition, pattern, and felt recognition. You often land on accurate reads quickly, without needing to reconstruct every step consciously.",
      everyday:
        "You might size up a person or a situation in seconds and be right more often than not. Explaining how you got there can be hard — you just knew. This serves you well where experience has trained your instincts; it's worth slowing down on decisions where your instincts haven't been trained yet.",
      howToRead:
        "Respect the speed of your reads, and notice when a decision deserves a slower second look.",
      distinct:
        "You share the Integrator's trust in intuition, but don't enjoy extended analysis the way they do. Unlike the Operator, intuition — not just action — is your guide.",
    },
    "The Operator": {
      meaning:
        "You'd rather move, test, and adjust than sit and analyze. Neither abstract reasoning nor introspection dominates — you learn by doing.",
      everyday:
        "You probably prefer to try something and see what happens rather than plan it to death. This makes you pragmatic and quick to act, and people may rely on you to just get on with it. The thing to watch is whether skipping past reflection ever costs you on decisions that really needed it.",
      howToRead:
        "This isn't a lack of intelligence — it's a preference for contact over contemplation. The useful question is whether a particular decision deserved more thought than you gave it.",
      distinct:
        "Unlike the Logician or the Reader, neither reasoning nor intuition is your main mode. You're the most action-first of the four.",
    },
    "The Generalist": {
      meaning:
        "You sit genuinely in the middle on both — not strongly drawn to hard thinking, not strongly led by gut. You shift between modes to fit the situation.",
      everyday:
        "You might analyze when it's called for and go with feel when it isn't, without a strong default either way. This flexibility is a real strength; the risk is that without a settled mode, you can take longer to commit to a direction.",
      howToRead:
        "This is a real pattern, not an indecisive result. The way you actually decide shows up in the dimensions below.",
      distinct:
        "The Generalist sits near the center, where none of the four modes dominates.",
    },
  },
  pride: {
    "The Beacon": {
      meaning:
        "You know yourself clearly and show yourself honestly. What people see is close to what's actually there.",
      everyday:
        "You tend to be the same person across rooms — work, friends, family — and people usually know where they stand with you. This coherence earns trust quickly. The flip side is that being this visible can feel exposing, and you may need to choose when and where to spend it.",
      howToRead:
        "This is about alignment between your inner self and what you show. The work isn't becoming more visible at all costs — it's choosing the contexts where that clarity helps.",
      distinct:
        "Compared to the Prism, you adapt your presentation less. Compared to the Ember, your sense of self is more settled.",
    },
    "The Prism": {
      meaning:
        "You know yourself clearly, but you change how you present depending on the context. Your inner sense stays stable while what you show shifts.",
      everyday:
        "You might be different at work, with family, and with friends — not because you're lost, but because you choose what each room gets. This can be a real social skill. The question worth asking is whether the adapting still feels chosen, or has become a habit of holding back.",
      howToRead:
        "Clarity without constant visibility can be maturity, privacy, or protection. Notice whether your adaptations feel deliberate or automatic.",
      distinct:
        "You share the Beacon's clarity, but not their direct visibility. Unlike the Aurora, your inner self stays defined even when your expression varies.",
    },
    "The Ember": {
      meaning:
        "You're still figuring out who you are — but what you do show tends to be genuine. The picture isn't finished, and it's honest.",
      everyday:
        "You might change your mind about yourself over time, try on different versions, and be open about the fact that you're doing it. People probably trust your honesty even when you can't give them a clean answer about who you are. Patience with your own becoming suits you here.",
      howToRead:
        "You don't need a finished identity to be authentic. Being honest about an unfinished one is its own kind of clarity.",
      distinct:
        "You share the Beacon's openness, but not their settled sense of self. Unlike the Aurora, what you show stays fairly direct even while you're exploring.",
    },
    "The Aurora": {
      meaning:
        "Both your sense of self and how you present it shift with context. You may feel fluid, responsive, and hard to reduce to one fixed description.",
      everyday:
        "Different people might describe you quite differently, and they could all be right. This can feel alive and adaptive — or, at times, ungrounded. The useful question is whether the flexibility feels like freedom or like drifting without an anchor.",
      howToRead:
        "This isn't a flaw. It can describe someone in transition or someone whose selfhood is genuinely plural. Notice whether the movement feels chosen.",
      distinct:
        "Unlike the Prism, your inner self moves too, not just your presentation. Unlike the Ember, what you show also shifts more across contexts.",
    },
    "The Reflection": {
      meaning:
        "You sit near the middle between knowing yourself clearly and showing yourself honestly — the surface where the two meet and turn back to look at itself.",
      everyday:
        "Some days you feel solid and seen; other days you're adapting or still working it out. That movement is normal, and it points to ongoing self-reflection rather than a fixed position.",
      howToRead:
        "Sitting in the middle can mean genuine balance, or two strong pulls quietly cancelling out. The dimension scores below show which.",
      distinct:
        "The Reflection isn't a fifth type — it's the middle ground the others move through.",
    },
  },
  passage: {
    "The Keeper": {
      meaning:
        "You're anchored by where you've come from — your roots, your memories, the people and places that shaped you.",
      everyday:
        "Traditions, origin stories, and long relationships probably carry real weight for you. You may be the one who remembers, who keeps the photos, who holds the thread of how a family or team became what it is. The thing to watch is whether the past nourishes the present or keeps pulling you back to it.",
      howToRead:
        "The past isn't behind you so much as under you — a source of meaning you keep returning to.",
      distinct:
        "The past stands out as your main engagement, more than for the Hearth or the Bridge, where it shares the stage.",
    },
    "The Witness": {
      meaning:
        "You're most alive in the immediacy of what's happening right now — what's in front of you, what you notice, what you feel.",
      everyday:
        "You may be the person who's actually there in the conversation, who notices the small things others miss, who doesn't drift to next week while today is still happening. This is presence, not passivity. It becomes most powerful when your attention is deep rather than just absent of planning.",
      howToRead:
        "Presence is your native gear. Notice when you let planning or memory crowd it out.",
      distinct:
        "The present is your main engagement, on its own — unlike the Flow or the Hearth, where it pairs with another zone.",
    },
    "The Wayfinder": {
      meaning:
        "You're oriented toward what's ahead — goals, possibility, the person you're becoming. The future is your compass.",
      everyday:
        "You probably plan, project, and imagine naturally, and you may feel most yourself when there's something to move toward. This pulls you forward and gives shape to your days. The thing to notice is whether the future is allowed to leave room for the life you're already inside.",
      howToRead:
        "The future organizes the present for you. It can be clarifying — and, unchecked, can quietly postpone the present.",
      distinct:
        "The future stands out as your main engagement, more than for the Bridge or the Flow, where it shares the stage.",
    },
    "The Hearth": {
      meaning:
        "You carry your roots into the living moment. Memory and presence warm each other.",
      everyday:
        "You might be someone who keeps traditions alive while staying genuinely engaged with today — family dinners that mean something, rituals that aren't just routine, a sense that where you came from feeds where you are. Belonging and warmth tend to matter a lot to you.",
      howToRead:
        "The past matters because it makes the present feel inhabited, not because the present matters less.",
      distinct:
        "Compared to the Keeper, the present is more active for you. Compared to the Witness, you carry more continuity with what came before.",
    },
    "The Bridge": {
      meaning:
        "You span from where you came from to where you're going. You read the future through the past, and the past through what it makes possible.",
      everyday:
        "You may have a strong sense of story — where you came from, what it cost, where it's pointing. This gives your life narrative shape and direction. The thing to watch is whether the present becomes just a crossing point between the two.",
      howToRead:
        "Roots and horizons together give you a long view. The missing piece can be the moment you're actually standing in.",
      distinct:
        "Compared to the Hearth, you lean more toward the future. Compared to the Wayfinder, you stay more rooted in memory.",
    },
    "The Flow": {
      meaning:
        "You're fully in the present and moving forward at the same time. Now and next feel like one motion.",
      everyday:
        "You might throw yourself into what you're doing while it clearly leads somewhere. Work that feels alive and goes somewhere, relationships that are both present and growing. The risk is moving so smoothly forward that you don't stop to take stock.",
      howToRead:
        "Presence and forward motion together can feel like momentum. Make sure you occasionally pause inside it.",
      distinct:
        "Compared to the Witness, the future pulls you forward too. Compared to the Wayfinder, you stay more grounded in the present.",
    },
    Balanced: {
      meaning:
        "Past, present, and future all engage for you. No single one owns the whole picture.",
      everyday:
        "You might draw on memory, stay with what's in front of you, and plan ahead without any one of those dominating. That breadth can feel integrated — and, sometimes, like competing loyalties between where you've been, where you are, and where you're going.",
      howToRead:
        "Balanced isn't better than the other types — it's a broad pattern. Its strength is range; its cost can be divided attention.",
      distinct:
        "Unlike the paired types, none of the three zones is left out for you.",
    },
    "The Wanderer": {
      meaning:
        "No single zone of time owns your attention. You move through past, present, and future lightly.",
      everyday:
        "You might not be strongly pulled by nostalgia, by the moment, or by long-range plans — you take each as it comes. This can read as freedom and openness. It can also read as being unmoored, so it's worth noticing which it feels like for you.",
      howToRead:
        "Lightness can be a gift or a sign that nothing has quite anchored you yet. Only you know which.",
      distinct:
        "Unlike Balanced, none of the three zones is strongly engaged for you — you move between them without settling.",
    },
  },
};
