"use client"
import { useState } from 'react'
import { EMAIL } from '@/data/site'

export default function CopyEmail() {
  const [done, setDone] = useState(false)
  return (
    <button className="copy" type="button" onClick={() => {
      try { navigator.clipboard.writeText(EMAIL) } catch (e) {}
      setDone(true); setTimeout(() => setDone(false), 1800)
    }}>{done ? 'Copied' : 'Copy email'}</button>
  )
}
