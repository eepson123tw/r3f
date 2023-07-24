// @ts-nocheck
import DrunkEffect from '../DrunkEffect.js'
import { forwardRef } from 'react'
function Drunk(props, ref) {
  const effect = new DrunkEffect(props)
  return <primitive object={effect} ref={ref} />
}

export default forwardRef(Drunk)
