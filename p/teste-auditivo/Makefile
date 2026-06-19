PORT ?= 4173
HOST ?= 0.0.0.0
WIFI_IP ?= $(shell ip route get 1.1.1.1 2>/dev/null | awk '{for (i = 1; i <= NF; i++) if ($$i == "src") {print $$(i + 1); exit}}')
PHONE_URL ?= http://$(WIFI_IP):$(PORT)

.PHONY: help dev check url qr status

help:
	@echo "Comandos disponiveis:"
	@echo "  make dev     Mostrar QR code e servir o site em http://0.0.0.0:$(PORT)"
	@echo "  make check   Verificar sintaxe do JavaScript"
	@echo "  make url     Mostrar a URL para abrir no celular"
	@echo "  make qr      Mostrar QR code da URL do celular"
	@echo "  make status  Mostrar status do git"

dev:
	@if [ -z "$(WIFI_IP)" ]; then \
		echo "Nao consegui detectar o IP da rede."; \
		exit 1; \
	fi
	@command -v qrencode >/dev/null 2>&1 || { echo "qrencode nao encontrado."; exit 1; }
	@echo "URL para celular: $(PHONE_URL)"
	@qrencode -t ANSIUTF8 "$(PHONE_URL)"
	@echo "Servidor local: http://localhost:$(PORT)"
	python3 -m http.server $(PORT) --bind $(HOST)

check:
	node --check app.js

url:
	@if [ -z "$(WIFI_IP)" ]; then \
		echo "Nao consegui detectar o IP da rede."; \
		exit 1; \
	fi
	@echo "$(PHONE_URL)"

qr:
	@if [ -z "$(WIFI_IP)" ]; then \
		echo "Nao consegui detectar o IP da rede."; \
		exit 1; \
	fi
	@command -v qrencode >/dev/null 2>&1 || { echo "qrencode nao encontrado."; exit 1; }
	@echo "$(PHONE_URL)"
	@qrencode -t ANSIUTF8 "$(PHONE_URL)"

status:
	git status --short
