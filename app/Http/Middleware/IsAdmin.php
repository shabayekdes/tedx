<?php

namespace App\Http\Middleware;

use Closure;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (auth()->user() &&  auth()->user()->isAdmin == 1) {
            return $next($request);
        }
        return redirect('/login')->with('warning', 'Your session has expired because your account is deactivated.');

    }
}