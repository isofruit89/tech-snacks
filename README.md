# Tech-Snack Mediathek

Statische Video-Übersicht für GitHub Pages. Die Videos liegen bei TechSmith und werden per Embed eingebunden.

## Dateien

| Datei | Zweck | Ins Repo? |
|---|---|---|
| `index.html` | Die Seite (Layout, Suche, Filter, Player, Login) | ja |
| `videos.json` | Öffentliche Videos | ja |
| `internal.enc.json` | Interne Videos, **verschlüsselt** | ja |
| `tools/internal.json` | Interne Videos im Klartext | **nein** (.gitignore) |
| `tools/encrypt-internal.mjs` | Verschlüsselt die interne Liste | ja |
| `logo.png`, `favicon.png` | ifm-Logo und Browser-Symbol | ja |

## Neues Video eintragen

Eintrag in `videos.json` (öffentlich) oder `tools/internal.json` (intern) ergänzen:

```json
{
  "id": "kurzer-eindeutiger-name",
  "titel": "Titel des Videos",
  "typ": "Produkt | Lösung | Überblick",
  "tags": ["IO-Link", "Grundlagen"],
  "level": "Einstieg | Fortgeschritten",
  "dauer": "6:12",
  "datum": "2026-11-22",
  "beschreibung": "Ein bis zwei Sätze.",
  "embedUrl": "src-Adresse aus dem Einbetten-Code von TechSmith",
  "url": "normaler Teilen-Link von TechSmith",
  "thumb": "optional: Bild-URL oder Dateiname im Repo, z. B. thumbs/io-link.jpg"
}
```

- **embedUrl:** Teilen-Link von TechSmith nehmen und `/e` anhängen, z. B. `https://app.screencast.com/z5bPwA5qZbNbu/e`.
- Videos der letzten 30 Tage bekommen automatisch das Label „Neu“.
- `id` ergibt den Direktlink: `https://<name>.github.io/tech-snack/#kurzer-eindeutiger-name`

## Interne Videos aktualisieren

1. `tools/internal.json` bearbeiten.
2. Verschlüsseln: `node tools/encrypt-internal.mjs "EuerPasswort"`
3. Die neue Datei `internal.enc.json` committen und pushen.

Ein neues Passwort heißt: Schritt 2 mit dem neuen Passwort ausführen. Das alte Passwort ist danach ungültig.

## Veröffentlichen mit GitHub Desktop

1. ZIP entpacken. Der Ordner `tech-snack` ist das Projekt.
2. GitHub Desktop → **File → Add local repository** → Ordner `tech-snack` wählen.
   Es kommt der Hinweis, dass der Ordner kein Repository ist → **create a repository** klicken → **Create repository**.
3. Links unten eine Commit-Nachricht eingeben (z. B. „Erste Version“) → **Commit to main**.
   `tools/internal.json` erscheint nicht in der Liste – die `.gitignore` hält sie draußen. Das ist richtig so.
4. Oben **Publish repository** → Haken bei **„Keep this code private“ entfernen** → Publish.
5. Auf github.com im Repo: **Settings → Pages** → Source „Deploy from a branch“, Branch `main`, Ordner `/ (root)` → **Save**.
6. Nach 1–2 Minuten ist die Seite erreichbar unter `https://<github-name>.github.io/tech-snack/`

Spätere Änderungen: Dateien im Ordner bearbeiten → in GitHub Desktop committen → **Push origin**.

## Wichtig zum Schutz interner Inhalte

- Die interne Liste ist mit AES-256 verschlüsselt. Ohne Passwort kann niemand Titel oder Links lesen, auch nicht im Quellcode.
- Das ist ein **gemeinsames Passwort**, kein persönlicher Login. Wer es weitergibt, gibt den Zugang weiter.
- Das Video selbst schützt das nicht: Wer den TechSmith-Link kennt, kann es ansehen. Interne Videos deshalb bei TechSmith auf eingeschränkte Sichtbarkeit stellen (z. B. nur Organisation bzw. nur mit Link, nicht öffentlich auffindbar).

## Branding

Farben und Schrift stehen oben in `index.html` im Block `:root { … }`. Dort die exakten ifm-Werte eintragen. Das Logo liegt als `logo.png` neben `index.html`.
