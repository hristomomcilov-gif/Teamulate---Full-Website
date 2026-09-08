/** Recreated from the August 2026 report charts. Not page scans. */

const AXIS = "#0b1631";
const MUTED = "#64748b";
const BLUE = "#3b6ef5";
const ORANGE = "#f49a16";

function Caption({ children }: { children: string }) {
  return <figcaption className="mt-3 text-sm italic leading-relaxed text-ink-muted">{children}</figcaption>;
}

export function FigureSalaryIndex() {
  return (
    <figure>
      <p className="mb-3 text-sm font-bold text-ink">How employer cost grows beyond salary</p>
      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 640 360"
          className="mx-auto h-auto w-full max-w-full"
          role="img"
          aria-labelledby="fig1-title fig1-desc"
        >
          <title id="fig1-title">Figure 1. Salary-only indexed to 100 versus modeled employer cost</title>
          <desc id="fig1-desc">
            United States: salary index 100, modeled employer cost 146. Canada: salary index 100, modeled
            employer cost 122.
          </desc>
          <text x="28" y="22" fill={MUTED} fontSize="12">
            Index: salary-only = 100
          </text>
          {[0, 40, 80, 120, 160].map((v) => {
            const y = 300 - v * 1.5;
            return (
              <g key={v}>
                <line x1="72" y1={y} x2="600" y2={y} stroke="#dbe3f0" />
                <text x="64" y={y + 4} textAnchor="end" fill={MUTED} fontSize="11">
                  {v}
                </text>
              </g>
            );
          })}
          <line x1="72" y1="300" x2="600" y2="300" stroke={AXIS} />
          <rect x="148" y="150" width="52" height="150" fill={BLUE} />
          <rect x="208" y="81" width="52" height="219" fill={ORANGE} />
          <text x="234" y="72" textAnchor="middle" fill={ORANGE} fontSize="14" fontWeight="700">
            146
          </text>
          <text x="204" y="322" textAnchor="middle" fill={AXIS} fontSize="13" fontWeight="600">
            United States
          </text>
          <rect x="388" y="150" width="52" height="150" fill={BLUE} />
          <rect x="448" y="117" width="52" height="183" fill={ORANGE} />
          <text x="474" y="108" textAnchor="middle" fill={ORANGE} fontSize="14" fontWeight="700">
            122
          </text>
          <text x="444" y="322" textAnchor="middle" fill={AXIS} fontSize="13" fontWeight="600">
            Canada
          </text>
          <rect x="200" y="338" width="12" height="12" fill={BLUE} />
          <text x="218" y="348" fill={MUTED} fontSize="11">
            Base salary index
          </text>
          <rect x="360" y="338" width="12" height="12" fill={ORANGE} />
          <text x="378" y="348" fill={MUTED} fontSize="11">
            Modeled employer-cost index
          </text>
        </svg>
      </div>
      <Caption>
        Figure 1. Salary-only is indexed to 100; modeled employer cost rises materially above payroll in both
        wage-model scenarios. Methodologies differ by country and are explained below.
      </Caption>
    </figure>
  );
}

export function FigureEmployerBurden() {
  return (
    <figure>
      <p className="mb-3 text-sm font-bold text-ink">Additional employer compensation / burden above salary</p>
      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 640 320"
          className="mx-auto h-auto w-full max-w-full"
          role="img"
          aria-labelledby="fig2-title fig2-desc"
        >
          <title id="fig2-title">Figure 2. Modeled employer cost above base payroll</title>
          <desc id="fig2-desc">United States about +46 percent. Canada about +22 percent.</desc>
          <text x="28" y="22" fill={MUTED} fontSize="12">
            Modeled cost above base payroll (%)
          </text>
          {[0, 10, 20, 30, 40, 50].map((v) => {
            const y = 260 - v * 4;
            return (
              <g key={v}>
                <line x1="72" y1={y} x2="600" y2={y} stroke="#dbe3f0" />
                <text x="64" y={y + 4} textAnchor="end" fill={MUTED} fontSize="11">
                  {v}
                </text>
              </g>
            );
          })}
          <line x1="72" y1="260" x2="600" y2="260" stroke={AXIS} />
          <rect x="168" y="76" width="88" height="184" fill={BLUE} />
          <text x="212" y="68" textAnchor="middle" fill={BLUE} fontSize="16" fontWeight="700">
            +46%
          </text>
          <text x="212" y="284" textAnchor="middle" fill={AXIS} fontSize="13" fontWeight="600">
            U.S.
          </text>
          <rect x="384" y="172" width="88" height="88" fill={BLUE} />
          <text x="428" y="164" textAnchor="middle" fill={BLUE} fontSize="16" fontWeight="700">
            +22%
          </text>
          <text x="428" y="284" textAnchor="middle" fill={AXIS} fontSize="13" fontWeight="600">
            Canada
          </text>
        </svg>
      </div>
      <Caption>
        Figure 2. Modeled employer cost above base payroll: about +46% in the U.S. wage scenario and +22% in
        the Canadian wage scenario.
      </Caption>
    </figure>
  );
}

export function FigurePublicSavings() {
  return (
    <figure>
      <p className="mb-3 text-sm font-bold text-ink">What “up to 90% lower” means as a comparison</p>
      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 640 220"
          className="mx-auto h-auto w-full max-w-full"
          role="img"
          aria-labelledby="fig3-title fig3-desc"
        >
          <title id="fig3-title">Figure 3. Relative cost index for a 90 percent reduction</title>
          <desc id="fig3-desc">
            Modeled human team indexed to 100 percent. A 90 percent reduction is a 10 percent cost reference.
          </desc>
          <text x="200" y="22" fill={MUTED} fontSize="12">
            Relative cost index
          </text>
          {[0, 20, 40, 60, 80, 100].map((v) => {
            const x = 180 + v * 4;
            return (
              <g key={v}>
                <line x1={x} y1="36" x2={x} y2="168" stroke="#dbe3f0" />
                <text x={x} y="186" textAnchor="middle" fill={MUTED} fontSize="11">
                  {v}
                </text>
              </g>
            );
          })}
          <text x="168" y="78" textAnchor="end" fill={AXIS} fontSize="13" fontWeight="600">
            10% cost reference
          </text>
          <rect x="180" y="58" width="40" height="28" fill={BLUE} />
          <text x="228" y="78" fill={BLUE} fontSize="14" fontWeight="700">
            10%
          </text>
          <text x="168" y="138" textAnchor="end" fill={AXIS} fontSize="13" fontWeight="600">
            Modeled human team
          </text>
          <rect x="180" y="118" width="400" height="28" fill={BLUE} />
          <text x="588" y="138" fill={BLUE} fontSize="14" fontWeight="700">
            100%
          </text>
        </svg>
      </div>
      <Caption>
        Figure 3. A 90% reduction means paying 10% of the comparison cost. This is the live public people-cost
        framing — modeled, not a guarantee. Software and ads sit outside the percentage.
      </Caption>
    </figure>
  );
}
