import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react"
import ConfirmDialog from "./ConfirmDialog"

const ConfirmContext = createContext(null)

export function ConfirmProvider({ children }) {
  const resolverRef = useRef(null)

  const [state, setState] = useState({
    open: false,
    title: "",
    message: "",
    confirmText: "Confirmar",
    cancelText: "Cancelar",
    variant: "danger",
    loading: false,
    error: "",
    onConfirm: null
  })

  const close = useCallback(() => {
    setState((s) => ({
      ...s,
      open: false,
      loading: false,
      error: "",
      onConfirm: null
    }))
  }, [])

  const confirm = useCallback((options) => {
    const {
      title = "Confirmar",
      message = "Tem certeza?",
      confirmText = "Confirmar",
      cancelText = "Cancelar",
      variant = "danger",
      onConfirm
    } = options || {}

    return new Promise((resolve) => {
      resolverRef.current = resolve

      setState({
        open: true,
        title,
        message,
        confirmText,
        cancelText,
        variant,
        loading: false,
        error: "",
        onConfirm: onConfirm || null
      })
    })
  }, [])

  const handleCancel = useCallback(() => {
    if (resolverRef.current) resolverRef.current(false)
    resolverRef.current = null
    close()
  }, [close])

  const handleConfirm = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: "" }))

    try {
      const current = state.onConfirm
      if (typeof current === "function") {
        await current()
      }

      if (resolverRef.current) resolverRef.current(true)
      resolverRef.current = null
      close()
    } catch (err) {
      const msg = err?.message || "Falha ao confirmar"
      setState((s) => ({ ...s, loading: false, error: msg }))
      // aqui a regra é: mantém aberto e mostra erro
    }
  }, [close, state.onConfirm])

  const value = useMemo(() => ({ confirm }), [confirm])

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      <ConfirmDialog
        open={state.open}
        title={state.title}
        message={state.message}
        confirmText={state.confirmText}
        cancelText={state.cancelText}
        variant={state.variant}
        loading={state.loading}
        error={state.error}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </ConfirmContext.Provider>
  )
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext)
  if (!ctx) throw new Error("useConfirm deve ser usado dentro de <ConfirmProvider>")
  return ctx.confirm
}
