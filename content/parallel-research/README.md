# Parallel Search hyperlocal research — Jul 2026

Generated via `parallel-cli search` for Summerlin West / Sun City / Heritage at Stonebridge hyperlocalization.

## Queries run

1. Summerlin Las Vegas village names neighborhoods map 2025 2026
2. Sun City Summerlin Del Webb active adult 55+ Las Vegas amenities HOA
3. Heritage at Stonebridge Summerlin Village of Stonebridge Las Vegas new construction
4. Las Vegas Summerlin real estate market 2025 2026 median price inventory days on market

## Key findings applied to site copy

| Topic | Finding | Source |
|-------|---------|--------|
| Summerlin West villages | The Vistas, The Paseos, Reverence, Stonebridge, Redpoint, Redpoint Square, Kestrel, Kestrel Commons, Grand Park, La Madre Peaks (89138) | [neighborhoodsinlasvegas.com/summerlin-west](https://neighborhoodsinlasvegas.com/summerlin-west/) |
| Sun City Summerlin | ~7,779 Del Webb homes (1989–1999), 4 rec centers, 54 golf holes, not guard-gated, zip 89134 | [55places.com Sun City Summerlin](https://www.55places.com/nevada/communities/sun-city-summerlin) |
| Heritage at Stonebridge | 421 Lennar 55+ homes (2021–2025), staff guard-gated, 8,000 sf clubhouse, zip 89138 | [heritagestonebridge.com](https://www.heritagestonebridge.com/) |
| Las Vegas median | ~$450K, ~52 DOM (May 2026 trailing 3 mo.) | [Redfin Las Vegas](https://www.redfin.com/city/10201/NV/Las-Vegas/housing-market) |
| Summerlin South median | ~$847K (+10.5% YoY), ~55 DOM | [Redfin Summerlin South](https://www.redfin.com/city/25923/NV/Summerlin-South/housing-market) |
| Sun City median | ~$480K, ~30 DOM (Jun 2026 rollup) | [nevadarealestategroup.com Sun City](https://www.nevadarealestategroup.com/las-vegas/sun-city-summerlin) |

Raw JSON outputs: `content/parallel-research/*.json`

## Regenerate

```bash
npm run content:parallel-draft   # requires AI_GATEWAY_API_KEY
npm run content:apply-draft -- --write
```

Or re-run parallel-cli searches and update `lib/hyperlocal-summerlin.ts` + marketing modules.
