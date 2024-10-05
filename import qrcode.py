import qrcode

# Generar código QR para un invitado con un enlace único
def generar_qr(invitado_id):
    url_confirmacion = f"https://tuevento.com/confirmar/{invitado_id}"
    qr = qrcode.make(url_confirmacion)
    qr.save(f"qr_invitado_{invitado_id}.png")
    print(f"QR generado para el invitado {invitado_id}")

# Generar QR para un invitado
generar_qr(123)