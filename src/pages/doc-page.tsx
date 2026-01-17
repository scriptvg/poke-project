import { useParams, Navigate, Link } from "react-router-dom";
import { DOCS_CONTENT, type DocSection, type DocProp } from "@/data/docs-content";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown, Copy, Check, Settings, Zap, AlertCircle, Info, Lightbulb, TriangleAlert } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Import components for demo registry
import { PokemonTypeBadge } from "@/components/pokemon-type/pokemon-type-badge";
import { PokemonCard } from "@/components/pokemon-card/pokemon-card";
import { PokemonStatsCard } from "@/components/pokemon-stats/pokemon-stats-card";
import { PokemonSearchBar } from "@/components/pokemon-search/pokemon-search-bar";
import { PokemonAbilitiesCard } from "@/components/pokemon-abilities/pokemon-abilities-card";
import { PokemonEvolutionPhase } from "@/components/evolution/pokemon-evolution-phase";
import { PokemonInfoCard } from "@/components/pokemon-info/pokemon-info-card";
import { PokemonWeaknessCard } from "@/components/pokemon-weakness/pokemon-weakness-card";

class ErrorBoundary extends React.Component<{ children: React.ReactNode, fallback: React.ReactNode }, { hasError: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() { return { hasError: true }; }
    render() {
        if (this.state.hasError) return this.props.fallback;
        return this.props.children;
    }
}

const COMPONENT_REGISTRY: Record<string, React.FC<any>> = {
    PokemonTypeBadge: (props) => (
        <div className="flex gap-2 p-4 border rounded-lg bg-background shadow-sm">
            <PokemonTypeBadge type={{ type: { name: "fire", url: "" } }} {...props} />
            <PokemonTypeBadge type={{ type: { name: "water", url: "" } }} {...props} />
            <PokemonTypeBadge type={{ type: { name: "grass", url: "" } }} {...props} />
            <PokemonTypeBadge type={{ type: { name: "electric", url: "" } }} {...props} />
        </div>
    ),
    PokemonCard: (props) => {
        const mockPokemon = {
            id: 25,
            name: "pikachu",
            sprites: {
                other: {
                    "official-artwork": {
                        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                    }
                }
            },
            types: [
                { type: { name: "electric" } }
            ]
        } as any;
        return (
            <div className="max-w-[250px] mx-auto p-4 border rounded-lg bg-background shadow-sm">
                <PokemonCard pokemon={mockPokemon} {...props} />
            </div>
        );
    },
    PokemonStatsCard: (props) => {
        // Mock data for demo
        const mockPokemon = {
            stats: [
                { base_stat: 45, stat: { name: "hp" } },
                { base_stat: 49, stat: { name: "attack" } },
                { base_stat: 49, stat: { name: "defense" } },
                { base_stat: 65, stat: { name: "special-attack" } },
                { base_stat: 65, stat: { name: "special-defense" } },
                { base_stat: 45, stat: { name: "speed" } },
            ]
        } as any;
        return <PokemonStatsCard pokemon={mockPokemon} {...props} />;
    },
    PokemonSearchBar: (props) => (
        <div className="w-full border rounded-lg p-2 bg-muted/30">
            <PokemonSearchBar
                searchTerm=""
                onSearchChange={() => { }}
                selectedType={null}
                onTypeChange={() => { }}
                uniqueTypes={["fire", "water", "grass"]}
                selectedGeneration={null}
                onGenerationChange={() => { }}
                {...props}
            />
        </div>
    ),
    PokemonAbilitiesCard: (props) => {
        const mockPokemon = {
            abilities: [
                { ability: { name: "overgrow", url: "" }, is_hidden: false, slot: 1 },
                { ability: { name: "chlorophyll", url: "" }, is_hidden: true, slot: 3 },
            ]
        } as any;
        return <div className="max-w-md mx-auto"><PokemonAbilitiesCard pokemon={mockPokemon} {...props} /></div>;
    },
    EvolutionChain: (props) => {
        const mockSpecies = { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon-species/1/" } as any;
        return <div className="max-w-2xl mx-auto"><PokemonEvolutionPhase species={mockSpecies} {...props} /></div>;
    },
    PokemonInfoCard: (props) => {
        const mockPokemon = {
            height: 7,
            weight: 69,
            base_experience: 64,
        } as any;
        const mockSpecies = {
            flavor_text_entries: [
                { flavor_text: "A strange seed was planted on its back at birth.", language: { name: "es" } }
            ]
        } as any;
        return <div className="max-w-md mx-auto"><PokemonInfoCard pokemon={mockPokemon} species={mockSpecies} {...props} /></div>;
    },
    PokemonWeaknessCard: (props) => {
        const mockPokemon = {
            types: [{ type: { name: "grass" } }, { type: { name: "poison" } }]
        } as any;
        return <div className="max-w-md mx-auto"><PokemonWeaknessCard pokemon={mockPokemon} {...props} /></div>;
    },
}


function Callout({ type, title, children }: { type: 'info' | 'warning' | 'tip' | 'note', title?: string, children: React.ReactNode }) {
    const configs = {
        info: { icon: Info, color: 'text-blue-500', bg: 'bg-blue-500/5', border: 'border-blue-500/20' },
        warning: { icon: TriangleAlert, color: 'text-amber-500', bg: 'bg-amber-500/5', border: 'border-amber-500/20' },
        tip: { icon: Lightbulb, color: 'text-emerald-500', bg: 'bg-emerald-500/5', border: 'border-emerald-500/20' },
        note: { icon: AlertCircle, color: 'text-indigo-500', bg: 'bg-indigo-500/5', border: 'border-indigo-500/20' },
    };
    const config = configs[type];
    const Icon = config.icon;

    return (
        <div className={`my-6 flex gap-4 p-4 rounded-xl border ${config.bg} ${config.border}`}>
            <Icon className={`h-5 w-5 shrink-0 ${config.color}`} />
            <div className="space-y-1">
                {title && <div className={`font-semibold text-sm tracking-tight ${config.color}`}>{title}</div>}
                <div className="text-sm text-foreground/80 leading-relaxed">{children}</div>
            </div>
        </div>
    );
}

function CodeBlock({ code, language }: { code: string, language: string }) {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="group relative my-6 rounded-xl bg-[#0d1117] p-5 font-mono text-sm overflow-x-auto border border-white/5 shadow-2xl">
            <div className="absolute top-3 right-3 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold bg-white/5 px-2 py-1 rounded">
                    {language}
                </span>
                <button
                    onClick={handleCopy}
                    className="p-2 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors border border-white/10"
                    title="Copy code"
                >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
            </div>
            <pre className="text-[#e6edf3] leading-relaxed"><code>{code}</code></pre>
        </div>
    );
}

function PropsTable({ props }: { props: DocProp[] }) {
    return (
        <div className="my-8 rounded-xl border border-border/50 overflow-hidden shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/30 border-b">
                        <TableHead className="w-[180px] text-xs uppercase tracking-wider font-bold">Propiedad</TableHead>
                        <TableHead className="w-[150px] text-xs uppercase tracking-wider font-bold">Tipo</TableHead>
                        <TableHead className="w-[120px] text-xs uppercase tracking-wider font-bold">Default</TableHead>
                        <TableHead className="text-xs uppercase tracking-wider font-bold">Descripción</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.map((prop) => (
                        <TableRow key={prop.name} className="hover:bg-muted/20 transition-colors">
                            <TableCell className="font-mono text-xs font-bold text-primary">{prop.name}</TableCell>
                            <TableCell>
                                <code className="text-[10px] px-1.5 py-0.5 rounded bg-muted font-bold text-muted-foreground whitespace-nowrap">
                                    {prop.type}
                                </code>
                            </TableCell>
                            <TableCell className="font-mono text-xs text-muted-foreground">
                                {prop.default || "—"}
                            </TableCell>
                            <TableCell className="text-sm leading-relaxed text-foreground/80">{prop.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function DropdownCopy() {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        toast.success("Enlace copiado", { description: "La URL de esta página está en tu portapapeles." });
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ButtonGroup>
            <Button variant='outline' className="rounded-l-lg px-4 border-r-0 " onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                <span className="ml-2 hidden sm:inline font-medium">Copy Page</span>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='outline' className="rounded-r-lg px-2  border-l">
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={handleCopy} className="gap-2">
                        <Copy className="h-4 w-4" /> View as Markdown
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                        <Zap className="h-4 w-4" /> Ver en GitHub
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </ButtonGroup>
    )
}

function ContentRenderer({ content }: { content: string }) {
    // Advanced parsing for custom syntax: [!type:title] content
    const blocks = content.split(/(\[!(?:info|warning|tip|note):?.*?\][\s\S]*?(?=\n\n|```|$)|```[\s\S]*?```|\n\n)/g);

    return (
        <div className="space-y-6">
            {blocks.map((block, i) => {
                if (!block.trim()) return null;

                // Callouts [!type:Title]
                if (block.startsWith("[!")) {
                    const match = block.match(/\[!(info|warning|tip|note):?(.*?)\]([\s\S]*)/);
                    if (match) {
                        return <Callout key={i} type={match[1] as any} title={match[2]?.trim()}>{match[3].trim()}</Callout>;
                    }
                }

                // Code Blocks
                if (block.startsWith("```")) {
                    const code = block.replace(/```[a-z]*\n?|```/g, "").trim();
                    const language = block.match(/```([a-z]*)/)?.[1] || "typescript";
                    return <CodeBlock key={i} code={code} language={language} />;
                }

                // Markdown-lite
                let renderedContent: React.ReactNode = block;
                if (block.includes("**")) {
                    const parts = block.split(/(\*\*.*?\*\*)/g);
                    renderedContent = parts.map((part, pi) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                            return <strong key={pi} className="font-bold text-foreground">{part.slice(2, -2)}</strong>;
                        }
                        return part;
                    });
                }

                return (
                    <p key={i} className="text-[17px] text-foreground/80 leading-[1.65] font-normal tracking-tight">
                        {renderedContent}
                    </p>
                );
            })}
        </div>
    );
}

export default function DocPage() {
    const params = useParams();
    let rawSlug = params["*"] || params.slug || "";

    // Normalizar slug: quitar slashes iniciales/finales y asegurar formato consistente
    const slug = rawSlug.replace(/^\/+|\/+$/g, "");

    const content = DOCS_CONTENT[slug];

    if (!content) {
        if (!slug) return <Navigate to="/docs/introduction" replace />;
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                <h1 className="text-2xl font-bold mb-2">Página no encontrada</h1>
                <p className="text-muted-foreground">La página de documentación "{slug}" no existe.</p>
                <Button asChild className="mt-4">
                    <Link to="/docs/introduction">Ir a Introducción</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto w-full px-4 py-16">
            <header className="mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div className="space-y-4">
                        <div className="text-primary text-sm font-semibold tracking-wide uppercase">Documentación Técnica</div>
                        <h1 className="text-2xl font-bold tracking-tight lg:text-4xl text-foreground">
                            {content.title}
                        </h1>
                    </div>
                    <DropdownCopy />
                </div>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                    {content.description}
                </p>
                <div className="mt-8 border-b" />
            </header>

            <div className="space-y-24">
                {content.sections.map((section: DocSection) => (
                    <section key={section.id} id={section.id} className="scroll-m-20">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-8 w-1 bg-primary rounded-full" />
                            <h2 className="text-3xl font-bold tracking-tight text-foreground">
                                {section.title}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-10">
                            <div className="space-y-8">
                                <ContentRenderer content={section.content} />

                                {section.demo && COMPONENT_REGISTRY[section.demo.component] && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                            <Zap className="h-4 w-4 text-amber-500" /> Demo Interactiva
                                        </div>
                                        <div className="p-8 border rounded-xl bg-muted/20 flex flex-col items-center justify-center min-h-[200px] border-dashed">
                                            <ErrorBoundary fallback={<div className="text-destructive text-sm font-medium flex items-center gap-2"><TriangleAlert className="h-4 w-4" /> Error al renderizar el componente de demo</div>}>
                                                {React.createElement(COMPONENT_REGISTRY[section.demo.component], section.demo.props)}
                                            </ErrorBoundary>
                                        </div>
                                    </div>
                                )}

                                {section.propsTable && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                            <Settings className="h-4 w-4" /> Propiedades del Componente
                                        </div>
                                        <PropsTable props={section.propsTable} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                ))}
            </div>


        </div>
    );
}

