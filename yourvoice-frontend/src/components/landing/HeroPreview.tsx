const HeroPreview = () => {
    return (
        <div className="
            w-full
            max-w-xl
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-xl
            overflow-hidden
        ">

            
            <div className="
                flex
                items-center
                justify-between
                border-b
                border-slate-200
                px-5
                py-4
                bg-slate-50
            ">

                <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                        yourVoice Dashboard
                    </h3>

                    <p className="text-xs text-slate-500 mt-1">
                        Anonymous communication platform
                    </p>
                </div>

                <div className="
                    rounded-full
                    bg-emerald-100
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-emerald-700
                ">
                    Secure
                </div>

            </div>

           
            <div className="p-5 space-y-4">

              
                <div className="
                    rounded-2xl
                    border
                    border-slate-200
                    p-4
                    bg-slate-50
                ">
                    <div className="flex items-start justify-between">

                        <div>
                            <p className="text-sm font-medium text-slate-900">
                                Anonymous Query
                            </p>

                            <p className="text-xs text-slate-500 mt-1">
                                Identity protected
                            </p>
                        </div>

                        <div className="
                            rounded-full
                            bg-indigo-100
                            px-2.5
                            py-1
                            text-[11px]
                            font-medium
                            text-indigo-700
                        ">
                            Student
                        </div>

                    </div>

                    <div className="mt-4 space-y-2">
                        <div className="h-2 rounded-full bg-slate-200 w-full" />
                        <div className="h-2 rounded-full bg-slate-200 w-4/5" />
                        <div className="h-2 rounded-full bg-slate-200 w-2/3" />
                    </div>
                </div>

               
                <div className="
                    rounded-2xl
                    border
                    border-slate-200
                    p-4
                    bg-white
                ">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm font-medium text-slate-900">
                                Moderation Queue
                            </p>

                            <p className="text-xs text-slate-500 mt-1">
                                Flagged submissions review
                            </p>
                        </div>

                        <div className="
                            rounded-full
                            bg-amber-100
                            px-2.5
                            py-1
                            text-[11px]
                            font-medium
                            text-amber-700
                        ">
                            Admin
                        </div>

                    </div>

                    <div className="mt-4 flex items-center gap-3">

                        <div className="
                            h-10
                            w-10
                            rounded-xl
                            bg-slate-100
                        " />

                        <div className="flex-1 space-y-2">
                            <div className="h-2 rounded-full bg-slate-200 w-3/4" />
                            <div className="h-2 rounded-full bg-slate-200 w-1/2" />
                        </div>

                    </div>
                </div>
                <div className="
    rounded-2xl
    border
    border-slate-200
    bg-slate-50
    p-4
">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm font-medium text-slate-900">
                                Access Control
                            </p>

                            <p className="text-xs text-slate-500 mt-1">
                                Role-specific protected routes and identity restrictions
                            </p>
                        </div>

                        <div className="
            rounded-full
            bg-slate-200
            px-3
            py-1
            text-[11px]
            font-medium
            text-slate-700
        ">
                            RBAC
                        </div>

                    </div>

                </div>

                
            </div>

        </div>
    );
};

export default HeroPreview;