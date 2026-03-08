# Nimazi Mirath

**Nimazi Mirath** is a simple web app.

It is part of the Nimazi series, alongside the Athan app and the Zakat app.

Nimazi Mirath is an **ad-free, no-login Islamic inheritance tool** that helps families estimate inheritance shares and organize estate information in a simple and respectful way.

The app should feel like the Zakat app:

* simple
* clean
* calm
* useful immediately
* mobile friendly
* no account required
* no ads

## Main purpose

Help users:

* enter family members
* enter estate value
* subtract debts and obligations
* estimate inheritance shares
* review a simple checklist
* print or export a summary

This is a **planning and educational tool only**.
It should not present itself as legal advice or a final religious ruling.

---

# Product tone

Keep the tone:

* respectful
* calm
* private
* easy to understand

Avoid making it feel:

* legal heavy
* overly technical
* cluttered
* emotionally dark

Use language like:

* Plan with clarity
* Organize your estate
* Protect your family from confusion
* Private and stored on your device

---

# Core rules

* No registration
* No ads
* No backend required for MVP
* Store data locally in browser storage
* Mobile-first
* Clean and minimal UI
* Similar visual style and simplicity as Nimazi Zakat

---

# Main sections

Build these sections:

1. **Home**
2. **Family**
3. **Estate**
4. **Distribution**
5. **Checklist**
6. **Summary**

This can be a tabbed layout or multi-step flow.

---

# Section details

## 1. Home

Show:

* app name
* short description
* private by default
* no account required
* ad free
* start button

Example copy:

**Nimazi Mirath**
Islamic inheritance planning, made simple.

**Private by default. No account required. No ads.**

Button: **Start Planning**

---

## 2. Family

Let the user enter the surviving family members.

Fields:

* deceased gender
* spouse exists
* number of sons
* number of daughters
* mother alive
* father alive

Optional advanced section:

* brothers
* sisters
* grandparents

Keep the default experience focused on common cases only.

---

## 3. Estate

Let the user enter:

### Assets

* cash
* gold
* investments
* property
* other

### Deductions

* debts
* funeral expenses
* unpaid zakat
* other obligations

Show:

* total assets
* total deductions
* net estate

Use simple number inputs and currency formatting.

---

## 4. Distribution

Show an estimated inheritance breakdown.

Support common cases for MVP:

* husband
* wife
* mother
* father
* sons
* daughters

Show:

* heir name
* share
* estimated amount
* short explanation

Always show disclaimer:

**This estimate is for planning and educational use only. Please confirm final inheritance matters with a qualified scholar and local attorney.**

If the case is too complex, show:

**This case may require scholarly review.**

Do not try to solve every inheritance edge case in v1.

---

## 5. Checklist

Add a simple checklist:

* list all assets
* record debts
* note unpaid zakat
* prepare a will
* leave family instructions
* review with scholar
* review with attorney

Save checklist progress locally.

---

## 6. Summary

Show a clean summary of:

* family
* estate totals
* net estate
* inheritance estimate
* checklist progress
* disclaimer

Actions:

* print summary
* export to PDF
* reset data

---

# Inheritance logic for MVP

Keep the inheritance engine simple.

Support these common rules:

## Spouse

* husband gets 1/2 if no children
* husband gets 1/4 if there are children
* wife gets 1/4 if no children
* wife gets 1/8 if there are children

## Mother

* mother gets 1/6 if children exist
* otherwise simplify or flag for review if needed

## Father

* father gets 1/6 in common child cases
* more complex cases can be flagged for review

## Children

* one daughter with no sons gets 1/2
* multiple daughters with no sons get 2/3 collectively
* sons and daughters share remainder with each son receiving twice the share of each daughter

## Net estate

Net estate =
assets
minus debts
minus funeral expenses
minus unpaid zakat
minus other obligations

If the case is too complex, do not guess. Show a review warning instead.

---

# UX expectations

* responsive on mobile and desktop
* very clean and uncluttered
* soft neutral colors
* rounded cards
* minimal icons
* calm spacing
* accessible form fields
* save progress automatically in local storage

The experience should feel similar in simplicity to the Nimazi Zakat app.

---

# Suggested TypeScript types

```ts
type FamilyProfile = {
  deceasedGender: "male" | "female";
  spouse: boolean;
  sons: number;
  daughters: number;
  motherAlive: boolean;
  fatherAlive: boolean;
};

type EstateData = {
  cash: number;
  gold: number;
  investments: number;
  property: number;
  other: number;
  debts: number;
  funeral: number;
  unpaidZakat: number;
  obligations: number;
};

type DistributionShare = {
  heir: string;
  fraction: string;
  percentage: number;
  amount: number;
  explanation: string;
};

type DistributionResult = {
  supported: boolean;
  requiresReview: boolean;
  shares: DistributionShare[];
  messages: string[];
};
```

---

# Main functions

Build:

* `calculateNetEstate()`
* `calculateInheritance()`
* `formatCurrency()`

The inheritance logic should be in pure functions and easy to test.

---

# Testing

Add tests for:

* wife + children
* husband + daughters
* parents + children
* daughter only
* unsupported complex case
* zero estate
* debts greater than assets

---

# Definition of done

The MVP is complete when:

* user can use the app without logging in
* user can enter family info
* user can enter estate info
* net estate calculates correctly
* supported inheritance cases show a readable estimate
* unsupported cases are flagged clearly
* checklist works
* data is saved locally
* summary can be printed or exported
* UI feels simple and calm like the Zakat app

---

# Final instruction

Build **Nimazi Mirath** as a simple, ad-free, no-login Islamic inheritance planning tool.

Keep it minimal, private, and easy to use.

Match the visual simplicity and structure of the Nimazi Zakat app.
Do not overengineer.
Focus on a clean MVP for common inheritance cases.
