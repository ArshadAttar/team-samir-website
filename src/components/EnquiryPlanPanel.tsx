import React from 'react';
import { CheckCircle, Star, Tag, Sparkles } from 'lucide-react';
import { BookingIntent, ServiceItem, ServicePlan } from '../types';
import { SERVICES, TRIAL_PLAN } from '../data/mockData';

/** Value stored in the form's "Plan" field for a service plan */
export const planValue = (serviceId: string, planName: string) => `${serviceId}::${planName}`;
export const TRIAL_VALUE = 'trial';

/** Human-readable label for a plan value ('' = not sure yet) */
export const planLabel = (value: string): string => {
  if (!value) return 'Not sure yet – help me choose';
  if (value === TRIAL_VALUE) return `${TRIAL_PLAN.name} – ${TRIAL_PLAN.price} (${TRIAL_PLAN.duration})`;
  const [serviceId, planName] = value.split('::');
  const service = SERVICES.find((s) => s.id === serviceId);
  return service ? `${service.title} – ${planName}` : planName;
};

interface EnquiryPlanPanelProps {
  intent: BookingIntent;
  selectedPlan: string;
  onSelectPlan: (value: string) => void;
}

const TrialCard: React.FC<{ selected: boolean; onSelect: () => void }> = ({ selected, onSelect }) => (
  <button
    type="button"
    onClick={onSelect}
    aria-pressed={selected}
    className={`w-full text-left rounded-2xl border p-4 sm:p-5 space-y-3 transition-all cursor-pointer ${
      selected ? 'border-[#1769FF] ring-2 ring-[#1769FF]/20 bg-[#EEF5FF]/60' : 'border-[#E1E6EF] bg-white hover:border-[#1769FF]/50'
    }`}
  >
    <div className="flex items-start justify-between gap-2">
      <div>
        <div className="inline-flex items-center gap-1 text-[length:max(11px,calc(11rem/16))] font-bold uppercase tracking-wider text-[#1769FF]">
          <Sparkles className="w-3.5 h-3.5" />
          Trial
        </div>
        <div className="text-base sm:text-lg font-display font-bold text-[#171A21]">{TRIAL_PLAN.name}</div>
        <div className="text-xs text-[#646B78]">{TRIAL_PLAN.duration}</div>
      </div>
      <span className="shrink-0 px-2.5 py-1 rounded-lg bg-[#1769FF] text-white text-xs sm:text-sm font-bold">
        {TRIAL_PLAN.price}
      </span>
    </div>
    <p className="text-xs text-[#646B78] leading-relaxed">{TRIAL_PLAN.summary}</p>
    <ul className="space-y-1.5">
      {TRIAL_PLAN.points.map((point) => (
        <li key={point} className="flex items-start gap-1.5 text-xs text-slate-700">
          <CheckCircle className="w-3.5 h-3.5 text-[#16834A] shrink-0 mt-0.5" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </button>
);

const PlanCard: React.FC<{ plan: ServicePlan; selected: boolean; onSelect: () => void }> = ({ plan, selected, onSelect }) => (
  <button
    type="button"
    onClick={onSelect}
    aria-pressed={selected}
    className={`relative w-full text-left rounded-xl border p-3.5 sm:p-4 space-y-2.5 transition-all cursor-pointer ${
      selected ? 'border-[#1769FF] ring-2 ring-[#1769FF]/20 bg-[#EEF5FF]/60' : 'border-[#E1E6EF] bg-white hover:border-[#1769FF]/50'
    }`}
  >
    {plan.popular && (
      <span className="absolute -top-2.5 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1769FF] text-white text-[length:max(10px,calc(10rem/16))] font-bold uppercase tracking-wide">
        <Star className="w-3 h-3 fill-current" />
        Most Popular
      </span>
    )}
    <div className="flex items-start justify-between gap-2">
      <div>
        <div className="text-sm sm:text-base font-display font-bold text-[#171A21]">{plan.name}</div>
        <div className="text-[length:max(11px,calc(11rem/16))] sm:text-xs text-[#646B78]">{plan.duration}</div>
      </div>
      {plan.discount > 0 && (
        <span className="shrink-0 px-2 py-0.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[#16834A] text-[length:max(11px,calc(11rem/16))] font-bold">
          Save {plan.discount}%
        </span>
      )}
    </div>
    <ul className="space-y-1">
      {plan.points.map((point) => (
        <li key={point} className="flex items-start gap-1.5 text-xs text-slate-700">
          <CheckCircle className="w-3.5 h-3.5 text-[#16834A] shrink-0 mt-0.5" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </button>
);

const ServiceGroup: React.FC<{ service: ServiceItem; selectedPlan: string; onSelectPlan: (v: string) => void }> = ({
  service,
  selectedPlan,
  onSelectPlan,
}) => (
  <div className="space-y-3">
    <div>
      <h3 className="text-base sm:text-lg font-display font-bold text-[#171A21]">{service.title}</h3>
      <p className="text-xs text-[#646B78] leading-relaxed">{service.shortDesc}</p>
    </div>
    <div className="space-y-3 pt-1">
      {service.plans.map((plan) => {
        const value = planValue(service.id, plan.name);
        return (
          <PlanCard key={value} plan={plan} selected={selectedPlan === value} onSelect={() => onSelectPlan(value)} />
        );
      })}
    </div>
  </div>
);

/**
 * Left side of the enquiry page. Shows the trial plan, one service's plans, or every plan
 * (in a scrollable list) depending on the button the visitor came from. Clicking a plan
 * selects it in the form's Plan field.
 */
export const EnquiryPlanPanel: React.FC<EnquiryPlanPanelProps> = ({ intent, selectedPlan, onSelectPlan }) => {
  const service = intent.kind === 'service' ? SERVICES.find((s) => s.id === intent.serviceId) : undefined;

  const title =
    intent.kind === 'trial' ? 'Your Trial Plan' : service ? `${service.title} Plans` : 'All Plans';
  const subtitle =
    intent.kind === 'trial'
      ? 'One Week of coaching to see how we work together.'
      : service
        ? 'Pick the plan that suits you, or decide on your free call.'
        : 'Scroll to compare every plan. Tap one to select it in the form.';

  return (
    <div className="rounded-2xl sm:rounded-3xl border border-[#E1E6EF] bg-slate-50 p-4 sm:p-6 space-y-4">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1769FF] uppercase tracking-wider">
          <Tag className="w-3.5 h-3.5" />
          Plan Details
        </div>
        <h2 className="text-xl sm:text-2xl font-display font-bold text-[#171A21] mt-1">{title}</h2>
        <p className="text-xs sm:text-sm text-[#646B78] mt-1">{subtitle}</p>
      </div>

      {intent.kind === 'trial' && (
        <TrialCard selected={selectedPlan === TRIAL_VALUE} onSelect={() => onSelectPlan(TRIAL_VALUE)} />
      )}

      {service && <ServiceGroup service={service} selectedPlan={selectedPlan} onSelectPlan={onSelectPlan} />}

      {intent.kind !== 'trial' && !service && (
        // All plans: scrolls inside its own box so the form stays in view
        <div className="max-h-[60vh] lg:max-h-[42rem] overflow-y-auto overscroll-contain pr-1 pt-2 -mr-1 space-y-6">
          <TrialCard selected={selectedPlan === TRIAL_VALUE} onSelect={() => onSelectPlan(TRIAL_VALUE)} />
          {SERVICES.map((s) => (
            <ServiceGroup key={s.id} service={s} selectedPlan={selectedPlan} onSelectPlan={onSelectPlan} />
          ))}
        </div>
      )}

      <p className="text-[length:max(11px,calc(11rem/16))] text-slate-400">
        Plan details are placeholders and will be updated. Final prices are shared on your call.
      </p>
    </div>
  );
};
