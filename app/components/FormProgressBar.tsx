'use client'

export type ProgressBarProps = {
  currentStep: number
  totalSteps: number
  stepNames?: string[]
}

export default function FormProgressBar({
  currentStep,
  totalSteps,
  stepNames,
}: ProgressBarProps) {
  const progressPercentage = (currentStep / totalSteps) * 100

  return (
    <div className="w-full mb-8">
      {/* Step indicator */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-electric-400">
            Step {currentStep} of {totalSteps}
          </p>
          {stepNames && stepNames[currentStep - 1] && (
            <p className="text-lg font-bold text-slate-100 mt-1">
              {stepNames[currentStep - 1]}
            </p>
          )}
        </div>
        <p className="text-xs text-slate-400 font-medium">
          Estimated time: 5-7 minutes
        </p>
      </div>

      {/* Progress bar background */}
      <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden border border-slate-700">
        {/* Progress bar fill */}
        <div
          className="h-full bg-gradient-to-r from-electric-500 to-cyan-500 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Additional info */}
      <p className="text-xs text-slate-400 mt-3">
        {currentStep === totalSteps
          ? 'Ready to submit your inquiry!'
          : `${totalSteps - currentStep} step${totalSteps - currentStep > 1 ? 's' : ''} remaining`}
      </p>
    </div>
  )
}
