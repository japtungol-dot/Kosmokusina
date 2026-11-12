import {
  createElement,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
} from "react"

const PRICE = 249

// Emails go to this Google Form (Responses tab).
const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeK_T5sjLl666cWzxrOmeFllUFDvcIDYiG1sxEjNEjteUDZ5Q/formResponse"
const FORM_FIELD = "entry.1314924265"

function Icon({ children, size = 20 }: { children: ReactNode; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {children}
    </svg>
  )
}

function SparkIcon() {
  return (
    <Icon size={21}>
      <path
        d="M12 2c.5 5.8 4.2 9.5 10 10-5.8.5-9.5 4.2-10 10-.5-5.8-4.2-9.5-10-10 5.8-.5 9.5-4.2 10-10Z"
        fill="currentColor"
      />
    </Icon>
  )
}

function ArrowIcon() {
  return (
    <Icon size={18}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" />
    </Icon>
  )
}

function BowlIcon({ size = 120 }: { size?: number }) {
  return (
    <Icon size={size}>
      <path
        d="M3 12h18a9 9 0 0 1-18 0Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1"
      />
      <path
        d="M8 3.5c-1 1.6 1 2.6 0 4.2M12 2.5c-1 1.6 1 2.6 0 4.2M16 3.5c-1 1.6 1 2.6 0 4.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.3"
      />
    </Icon>
  )
}

function Button({
  children,
  className = "",
  onClick,
  label,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
  label?: string
}) {
  return createElement(
    "button",
    {
      "aria-label": label,
      className: `button ${className}`,
      onClick,
      type: "button",
    },
    children,
  )
}

function Link({
  children,
  href,
  className = "",
}: {
  children: ReactNode
  href: string
  className?: string
}) {
  return createElement("a", { className, href }, children)
}

function Heading({
  as,
  children,
}: {
  as: "h1" | "h2" | "h3"
  children: ReactNode
}) {
  return createElement(as, null, children)
}

export default function App() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState("")
  const [joined, setJoined] = useState(false)
  const [sending, setSending] = useState(false)
  const [failed, setFailed] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const tiltCard = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    cardRef.current?.style.setProperty("--tilt-x", `${y * -14}deg`)
    cardRef.current?.style.setProperty("--tilt-y", `${x * 18}deg`)
  }

  const resetCard = () => {
    cardRef.current?.style.setProperty("--tilt-x", "0deg")
    cardRef.current?.style.setProperty("--tilt-y", "0deg")
  }

  const joinWaitlist = async (event: FormEvent) => {
    event.preventDefault()
    if (sending) return
    setSending(true)
    setFailed(false)
    try {
      await fetch(FORM_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ [FORM_FIELD]: email }).toString(),
      })
      setJoined(true)
    } catch {
      setFailed(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="site-shell">
      <nav className="nav">
        <Link className="brand" href="#top">
          <span className="brand-mark">
            <SparkIcon />
          </span>
          KOSMOKUSINA
        </Link>
        <div className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
          <Link href="#menu">Space Adobo</Link>
          <Link href="#story">Our story</Link>
        </div>
        <div className="nav-actions">
          <Link className="cart-link" href="#menu">
            Join the waitlist
          </Link>
          <Button
            className="menu-toggle"
            label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
          </Button>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-intro">
          <p className="eyebrow">
            <span className="live-dot" />
            Filipino food / Future ready
          </p>
          <Heading as="h1">
            eat like an astronaut.
            <br />
            <span>Zero gravity.</span>
          </Heading>
          <p className="hero-description">
            Iconic Filipino comfort food transformed into lightweight,
            shelf-stable meals for every adventure.
          </p>
        </div>

        <div
          className="product-stage"
          onMouseLeave={resetCard}
          onMouseMove={tiltCard}
        >
          <div className="orbit orbit-one">
            <span />
          </div>
          <div className="orbit orbit-two">
            <span />
          </div>
          <div className="product-shadow" />
          <div className="meal-pouch" ref={cardRef}>
            <div className="card-sheen" />
            <div className="pouch-topline">
              <span>KOSMOKUSINA</span>
              <b>01</b>
            </div>
            <div className="pouch-image">
              <BowlIcon size={150} />
              <em>?</em>
            </div>
            <div className="pouch-copy">
              <small>FILIPINO SPACE FOOD</small>
              <strong>Space Adobo</strong>
              <span>To be revealed</span>
            </div>
            <div className="pouch-stamp">
              YET TO
              <br />
              LAND
            </div>
          </div>
          <div className="float-tag tag-one">First batch</div>
          <div className="float-tag tag-two">Pre-orders soon</div>
          <p className="move-hint">Move cursor to rotate</p>
        </div>

        <aside className="meal-selector" id="menu">
          <p className="selector-label">Meal 01</p>
          <div className="product-row">
            <strong>Space Adobo</strong>
        
          </div>
          <div className="selected-details">
            <p>Soy • cane vinegar • black pepper</p>
            <span>
              The Filipino classic, slow-cooked and freeze-dried for a rich,
              savory bite anywhere in the universe.
            </span>
          </div>
          {joined ? (
            <div className="joined-note">
              <strong>You&rsquo;re on the list.</strong>
              <span>We&rsquo;ll email you when pre-orders open.</span>
            </div>
          ) : (
            <form className="waitlist" onSubmit={joinWaitlist}>
              <input
                aria-label="Email address"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="your@email.com"
                required
                type="email"
                value={email}
              />
              <button
                className="button add-button"
                disabled={sending}
                type="submit"
              >
                <span>{sending ? "Sending..." : "Reserve my spot"}</span>
                <strong>→</strong>
              </button>
              {failed && (
                <p className="shipping-note">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
          <p className="shipping-note">
            No payment yet. We&rsquo;ll email you when pre-orders open.
          </p>
        </aside>
      </section>

      <section className="ticker" aria-label="Product qualities">
        <div className="ticker-track">
          <span>Filipino soul food</span>
          <b>✦</b>
          <span>First batch coming soon</span>
          <b>✦</b>
          <span>Pre-orders opening soon</span>
          <b>✦</b>
          <span>Filipino soul food</span>
          <b>✦</b>
          <span>First batch coming soon</span>
          <b>✦</b>
        </div>
      </section>

      <section className="story-section" id="story">
        <div className="story-card story-art">
          <BowlIcon size={240} />
          <span>Made for the wildly curious</span>
        </div>
        <div className="story-card story-copy">
          <p className="eyebrow eyebrow-dark">A taste of home, way out there</p>
          <Heading as="h2">
            This is not
            <br />
            <i>astronaut ice cream.</i>
          </Heading>
          <p>
            Kosmokusina starts with real Filipino recipes, real ingredients, and a
            lot of heart. Then we use food science to make every bowl lighter,
            longer-lasting, and ready to travel.
          </p>
          <Link href="#menu">
            Reserve my spot <ArrowIcon />
          </Link>
        </div>
      </section>

      <section className="final-cta">
        <p>Hungry for liftoff?</p>
        <Heading as="h2">
          Be first in
          <br />
          <i>orbit.</i>
        </Heading>
        <Link href="#menu">
          Join the first batch <ArrowIcon />
        </Link>
      </section>

      <footer>
        <Link className="brand footer-brand" href="#top">
          <span className="brand-mark">
            <SparkIcon />
          </span>
          KOSMOKUSINA
        </Link>
        <p>Filipino food for everywhere else.</p>
        <span>© 2026 Kosmokusina Foods</span>
      </footer>
    </main>
  )
}
