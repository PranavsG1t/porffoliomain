const WORDS = ['Machine learning', 'Robotics', 'Brand design', 'Photography', 'Product UI', 'IoT']

export default function Marquee() {
  const half = WORDS.map((w) => <span key={w}>{w}<i /></span>)
  return (
    <div className="mq" aria-hidden="true">
      <div className="mq-t">{half}{WORDS.map((w) => <span key={w + '2'}>{w}<i /></span>)}</div>
    </div>
  )
}
